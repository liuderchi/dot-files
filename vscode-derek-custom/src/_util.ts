'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import {
  TypeReplaceCurrentLine,
  TypeJumpToSearchMatch,
  TypeFindInTextEditor,
} from './types';

export const getYearMonthDay: (date?: Date) => [number, string, string] = (
  date = new Date(),
) => [
  date.getFullYear(),
  // @ts-ignore
  String(date.getMonth() + 1).padStart(2, '0'),
  // @ts-ignore
  String(date.getDate()).padStart(2, '0'),
];

export const getFileNameCap = (fileName: string) => {
  const regexMatch: RegExpExecArray | null = /(.*?)(?:\.[^.]+)?$/.exec(
    path.basename(fileName),
  );
  return regexMatch
    ? regexMatch[1]
        .replace(/[!-.\:-\@\[-\`\{-~]/g, ' ') // non-Word, /[\W_]/g
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Foo';
};

export const withWarningMessage = (fcn: () => any) => () => {
  try {
    fcn();
  } catch (e) {
    vscode.window.showWarningMessage(e);
  }
};

export const withActiveEditor = (f: Function) => () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    throw { error: 'No Active Editor' };
  }
  f({ editor });
};

export const withSuccessCheck = (f: Function, ...args: any[]) => (
  success: boolean,
): any => {
  if (success) {
    return f(...args);
  }
};

export const getCurrentLine = (editor: vscode.TextEditor): vscode.TextLine => {
  const currentLineNum = editor.selection.start.line; // start from zero
  return editor.document.lineAt(currentLineNum);
};

export const getCurrentLineRange = (editor: vscode.TextEditor): vscode.Range =>
  getCurrentLine(editor).range;

export const getCurrentLineText = (editor: vscode.TextEditor): string =>
  getCurrentLine(editor).text;

export const findInTextEditor: TypeFindInTextEditor = ({ regex, editor }) => {
  let line = -1,
    character = -1;
  for (let _line = 0, _char = -1; _line < editor.document.lineCount; _line++) {
    _char = editor.document.lineAt(_line).text.search(regex);
    if (_char > -1) {
      line = _line;
      character = _char;
      break;
    }
  }
  return new vscode.Position(line, character);
};

export const jumpToSearchMatch: TypeJumpToSearchMatch = ({
  regex,
  offset = 0,
  editor,
}) => {
  const newPosition = findInTextEditor({ editor, regex }).translate(0, offset);
  editor.selection = new vscode.Selection(newPosition, newPosition);
  editor.revealRange(getCurrentLineRange(editor), 2); // Note editor.visibleRanges is readonly
};

export const replaceCurrentLine: TypeReplaceCurrentLine = ({
  regex,
  str,
  editor,
}) => {
  editor.edit((edit: vscode.TextEditorEdit) => {
    const { text, range } = getCurrentLine(editor);
    edit.replace(range, text.replace(regex, str));
  });
};

export const setCursorToSelectionStart = (editor: vscode.TextEditor): void => {
  const { start } = editor.selection;
  editor.selection = new vscode.Selection(start, start);
};

export const setCursorToSelectionEnd = (editor: vscode.TextEditor): void => {
  const { end } = editor.selection;
  editor.selection = new vscode.Selection(end, end);
};
