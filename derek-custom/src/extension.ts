// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import markdownDisposables from './markdown';
import utilDisposables from './util';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(...markdownDisposables, ...utilDisposables);
}

// this method is called when your extension is deactivated
export function deactivate() {}
