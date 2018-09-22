'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "derek-custom" is now active!');

  let disposable = vscode.commands.registerCommand('extension.md.insertInitTemplate', () => {
    vscode.window.showInformationMessage('Hello World!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
