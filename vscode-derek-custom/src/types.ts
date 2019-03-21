import * as vscode from 'vscode';

export type EditorOp = (
  {
    editor,
  }: {
    editor: vscode.TextEditor;
  },
) => void;

export type TypeReplaceCurrentLine = (
  {
    regex,
    str,
    editor,
  }: { regex: RegExp; str: string; editor: vscode.TextEditor },
) => void;

export type TypeJumpToSearchMatch = (
  {
    regex,
    offset,
    editor,
  }: { regex: RegExp; offset?: number; editor: vscode.TextEditor },
) => void;

export type TypeFindInTextEditor = (
  { regex, editor }: { regex: RegExp; editor: vscode.TextEditor },
) => vscode.Position;
