'use strict';

import * as vscode from 'vscode';
import { getFileNameCap, withWarningMessage, withActiveEditor } from './_util';

const insertFunctionalComponent = ({
  editor,
}: {
  editor: vscode.TextEditor;
}) => {
  const fileNameCap = getFileNameCap(editor.document.fileName);
  const template = `import React from 'react';\n\nconst ${fileNameCap} = props => {\n  return (\n    <div>todo</div>;\n  )\n};\n\nexport default ${fileNameCap};`;
  editor.edit((edit: vscode.TextEditorEdit) =>
    edit.replace(editor.selection, template),
  );
};

export default [
  vscode.commands.registerCommand(
    'extension.util.insertFunctionalComponent',
    withWarningMessage(withActiveEditor(insertFunctionalComponent)),
  ),
];
