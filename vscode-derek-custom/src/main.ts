'use strict';

import * as vscode from 'vscode';
import markdownDisposables from './markdown';
import utilDisposables from './util';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(...markdownDisposables, ...utilDisposables);
}

export function deactivate() {}
