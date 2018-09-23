'use strict';

import * as vscode from 'vscode';
import markdownDisposables from './markdown';

export function activate(context: vscode.ExtensionContext) {
  markdownDisposables.forEach(disposable =>
    context.subscriptions.push(disposable),
  );
}

export function deactivate() {}
