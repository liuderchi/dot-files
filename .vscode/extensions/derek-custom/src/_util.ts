'use strict';

import * as vscode from 'vscode';

export const getYearMonthDay: (date?: Date) => [number, string, string] = (
  date = new Date(),
) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, '0'),
  String(date.getDate()).padStart(2, '0'),
];

export const withWarningMessage = (fcn) => () => {
  try {
    fcn();
  } catch (e) {
    vscode.window.showWarningMessage(e);
  }
}