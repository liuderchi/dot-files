'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import { getYearMonthDay, withWarningMessage } from './_util';

const insertInitTemplate = () => {
  let editor = vscode.window.activeTextEditor;
  if (!editor) throw 'No Active Editor';

  const filenameNoExt = /(.*?)(?:\.[^.]+)?$/.exec(
    path.basename(vscode.window.activeTextEditor.document.fileName),
  )[1];
  const fileNameCap = filenameNoExt
    .replace(/[!-.\:-\@\[-\`\{-~]/g, ' ') // non-Word, /[\W_]/g
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const [year, month, day] = getYearMonthDay();

  const template = `# ${fileNameCap}\n## Date\n\n- ${year}-${month}-${day}\n\n## Description\n\n-\n__WIP ${year}-${month}-${day}__\n`;

  editor.edit(edit => edit.replace(editor.selection, template));
};
};

export const insertInitTemplateDisposable = vscode.commands.registerCommand(
  'extension.md.insertInitTemplate',
  withWarningMessage(insertInitTemplate),
);

export default [insertInitTemplateDisposable];
