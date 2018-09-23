'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import { getYearMonthDay } from './_util';


export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "derek-custom" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.md.insertInitTemplate', () => {
      const filenameNoExt = /(.*?)(?:\.[^.]+)?$/.exec(
        path.basename(vscode.window.activeTextEditor.document.fileName),
      )[1];
      const fileNameCap = filenameNoExt
        .replace(/[!-.\:-\@\[-\`\{-~]/g, ' ') // non-Word, /[\W_]/g
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      const [year, month, day] = getYearMonthDay();

      const template = `# ${fileNameCap}\n\n## Date\n\n- ${year}-${month}-${day}\n\n## Description\n\n-\n__WIP ${year}-${month}-${day}__`;

      let editor = vscode.window.activeTextEditor;
      if (!editor) return;

      editor.edit(edit => edit.insert(new vscode.Position(0, 0), template));
      // TODO insert at current line
    }),
  );
}

export function deactivate() {}
