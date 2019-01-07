'use strict';

import * as vscode from 'vscode';
import {
  getFileNameCap,
  getYearMonthDay,
  withWarningMessage,
  withActiveEditor,
  withSuccessCheck,
  jumpToSearchMatch,
  replaceCurrentLine,
  setCursorToSelectionEnd,
} from './_util';
import { EditorOp } from './types';

const insertInitTemplate: EditorOp = ({ editor }) => {
  const fileNameCap = getFileNameCap(editor.document.fileName);
  const [year, month, day] = getYearMonthDay();
  const template = `# ${fileNameCap}\n\n## Date\n\n- ${year}-${month}-${day}\n\n## Description\n\n-\n__WIP ${year}-${month}-${day}__\n`;
  editor
    .edit((edit: vscode.TextEditorEdit) =>
      edit.replace(editor.selection, template),
    )
    .then(withSuccessCheck(setCursorToSelectionEnd, editor));
};

const insertToday: EditorOp = ({ editor }) => {
  const [year, month, day] = getYearMonthDay();
  editor
    .edit((edit: vscode.TextEditorEdit) =>
      edit.replace(editor.selection, `${year}-${month}-${day}`),
    )
    .then(withSuccessCheck(setCursorToSelectionEnd, editor));
};

const insertWorkdayCount: EditorOp = ({ editor }) => {
  const onBoardDay = new Date('2017-06-26');
  const dayCount = Math.ceil(
    (new Date().getTime() - onBoardDay.getTime()) / (86400 * 1000),
  );
  // @ts-ignore
  const [_, month, day] = getYearMonthDay();
  editor
    .edit((edit: vscode.TextEditorEdit) =>
      edit.replace(editor.selection, `d${dayCount}-${month}-${day}`),
    )
    .then(withSuccessCheck(setCursorToSelectionEnd, editor));
};

const insertWipProgress: EditorOp = ({ editor }): void => {
  const [year, month, day] = getYearMonthDay();
  const template = `__WIP ${year}-${month}-${day}__`;
  editor
    .edit((edit: vscode.TextEditorEdit) =>
      edit.replace(editor.selection, template),
    )
    .then(withSuccessCheck(setCursorToSelectionEnd, editor));
};

const updateWipProgress: EditorOp = ({ editor }): void => {
  const [year, month, day] = getYearMonthDay();
  jumpToSearchMatch({
    regex: /(__|\*\*)WIP \d{4}-\d{2}-\d{2}/g,
    offset: 16,
    editor,
  });
  replaceCurrentLine({
    regex: /\d{4}-\d{2}-\d{2}/,
    str: `${year}-${month}-${day}`,
    editor,
  });
};

export default [
  vscode.commands.registerCommand(
    'extension.md.insertInitTemplate',
    withWarningMessage(withActiveEditor(insertInitTemplate)),
  ),
  vscode.commands.registerCommand(
    'extension.md.insertToday',
    withWarningMessage(withActiveEditor(insertToday)),
  ),
  vscode.commands.registerCommand(
    'extension.md.insertWorkdayCount',
    withWarningMessage(withActiveEditor(insertWorkdayCount)),
  ),
  vscode.commands.registerCommand(
    'extension.md.insertWipProgress',
    withWarningMessage(withActiveEditor(insertWipProgress)),
  ),
  vscode.commands.registerCommand(
    'extension.md.updateWipProgress',
    withWarningMessage(withActiveEditor(updateWipProgress)),
  ),
];
