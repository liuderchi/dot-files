'use babel'

// init script to register util commands

import path from 'path'

import {
  CURSOR_MOVE_BIG,
  addCmd,
  requireEditor,
  requireCursor,
  bindActiveCursor,
  paintWarnColorToLineEndUI,
  applyDynamicCursorWidthByFontSize,
  getCamelCaseNameFromPath,
  insertTextToAllSelection,
  mdInsertion,
  i18nOpenCsonBatch,
  openFiles,
  registerOpenFileCommands,
  registerDiffFileCommands,
} from './_util'
import {
  vscodeConfigPaths,
  atomConfigPaths,
  zshConfigPaths,
  hyperConfigPaths,
  nvmConfigPaths,
  tmuxConfigPaths,
  privateConfigPaths,
} from './env.js'


// addCmd('atom-text-editor', 'util:print-scope-descriptor-by-current-cursor', bindActiveCursor(() => {  // FAIL
// addCmd('atom-text-editor', 'util:print-scope-descriptor-by-current-cursor', requireCursor(({ cursor }) => {  // PASS
addCmd('atom-text-editor', 'util:print-scope-descriptor-by-current-cursor', bindActiveCursor(function() {  // PASS, use this.cursor
  const _scopes = this.cursor.getScopeDescriptor().scopes.map(scope => `* \\>\`${scope.toString()}\``)
  atom.notifications.addInfo(    // NOTE addInfo() supports markdown text
    `## cursor scope path\n${_scopes.join('\n')}`,
    { dismissable: true }
  )
}))

addCmd('atom-text-editor', 'util:move-up-big', requireEditor(({ editor }) => editor.moveUp(CURSOR_MOVE_BIG)))

addCmd('atom-text-editor', 'util:move-down-big', requireEditor(({ editor }) => editor.moveDown(CURSOR_MOVE_BIG)))

addCmd('atom-text-editor', 'util:tokenize-selected-text-by-grammar', requireEditor(({ editor }) => {
  const selectedText = editor.getLastSelection().getText()
  const { tokens } = editor.getGrammar().tokenizeLine(selectedText);
  const { name: grammarName, scopeName } = editor.getGrammar()

  atom.notifications.addInfo(
    `tokenized selection in \`${grammarName}\`.
    \n* scope: \`${scopeName}\`
    \n* non-blank tokens with leaf scope:
    \n${tokens
      .filter(token => !token.value.match(/\s+/g))
      .map(token =>`  * \`${token.value}\`: \`${token.scopes.slice(-1)}\``)
      .join('\n')
    }`,
    { dismissable: true }
  )
}))

addCmd('atom-text-editor', 'util:unfold-selected', requireEditor(({ editor }) => editor.getSelectedBufferRanges()
  .forEach(range => editor.destroyFoldsIntersectingBufferRange(range))))

registerOpenFileCommands({
  prefix: "util:dot-atom-open",
  paths: atomConfigPaths.local,
})
registerOpenFileCommands({
  prefix: "util:dot-atom-open-my",
  paths: atomConfigPaths.private,
})
registerDiffFileCommands({
  name: 'util:diff-dot-atom-configs',
  pathGroups: [atomConfigPaths.local, atomConfigPaths.private]
})

registerOpenFileCommands({
  prefix: 'util:dot-zshrc-open',
  paths: zshConfigPaths.local,
})
registerOpenFileCommands({
  prefix: "util:dot-zshrc-open-my",
  paths: zshConfigPaths.private,
})
registerDiffFileCommands({
  name: 'util:diff-dot-zshrc-files',
  pathGroups: [zshConfigPaths.local, zshConfigPaths.private],
})

registerDiffFileCommands({
  name: 'util:diff-dot-hyper-files',
  pathGroups: [hyperConfigPaths.local, hyperConfigPaths.private],
})

registerDiffFileCommands({
  name: 'util:diff-nvm-default-packages',
  pathGroups: [nvmConfigPaths.local, nvmConfigPaths.private]
})

registerDiffFileCommands({
  name: 'util:diff-dot-tmux-files',
  pathGroups: [tmuxConfigPaths.local, tmuxConfigPaths.private]
})

registerOpenFileCommands({
  prefix: "util:vscode-config-open",
  paths: vscodeConfigPaths.local
});
registerOpenFileCommands({
  prefix: "util:vscode-config-open-my",
  paths: vscodeConfigPaths.private
});
registerDiffFileCommands({
  name: "util:diff-vscode-config-files",
  pathGroups: [vscodeConfigPaths.local, vscodeConfigPaths.private]
});

registerOpenFileCommands({
  prefix: 'util:open-oh-my-zsh-theme-config',
  paths: privateConfigPaths.omzThemeAgnoster,
})
registerOpenFileCommands({
  prefix: 'util:open-oh-my-zsh-theme-config',
  paths: privateConfigPaths.omzThemePowerLevel9k,
})
registerOpenFileCommands({ paths: privateConfigPaths.workLog })

addCmd('atom-workspace', 'util:open-all-files-of-current-dir',
  requireEditor(({ editor }) => {
    const SPECIAL_PREFIX = ['index','main']
    const currentDir = path.dirname(editor.getPath())
    const filenames = fs.readdirSync(currentDir)
    const addPriority = name => ({
      priority: SPECIAL_PREFIX.some(prefix => name.search(prefix) > -1)
        ? 0
        : name.toUpperCase().codePointAt(0),
      name,
    })
    openFiles({
      paths: filenames.map(addPriority)
                      .sort((a, b) => a.priority - b.priority)
                      .map(({ name }) => path.join(currentDir, name))
                      .filter(f => fs.statSync(f).isFile()),
      splitPane: 'left',
    })()
}))

const FONT_SETTING = [
  { fontFamily: 'fira Code', fontSize: 14 }
]

// runned when switch tab
atom.workspace.observeActivePaneItem(() => setTimeout(paintWarnColorToLineEndUI, 1000))

// applyDynamicCursorWidthByFontSize()

addCmd('atom-text-editor', 'util:react-functional-component-template', requireEditor(({ editor }) => {
  const fileNameCap = getCamelCaseNameFromPath(editor.getPath())
  const template = `import React from 'react'\n\nconst ${fileNameCap} = (props) => {\n  return (\n    <div></div>\n  )\n}\n\nexport default ${fileNameCap}`
  editor.getLastSelection().insertText(template)
}))

addCmd('atom-text-editor', 'util:react-class-based-component-template', requireEditor(({ editor }) => {
  const fileNameCap = getCamelCaseNameFromPath(editor.getPath())
  const template = `import React, { Component } from 'react'\n\nclass ${fileNameCap} extends Component {\n  render() {\n    return (\n      <div></div>\n    )\n  }\n}\n\nexport default ${fileNameCap}`
  editor.getLastSelection().insertText(template)
}))

// addCmd('atom-text-editor', 'util:react-add-component-syntax', insertTextToAllSelection('<! />'))
addCmd('atom-text-editor', 'util:react-add-component-syntax', mdInsertion`<${0} />`)

// === i18n-dev util
addCmd('atom-workspace', 'i18n-dev:open-all-menu-darwin-cson', () => i18nOpenCsonBatch('menu_darwin.cson'))
addCmd('atom-workspace', 'i18n-dev:open-all-menu-linux-cson', () => i18nOpenCsonBatch('menu_linux.cson'))
addCmd('atom-workspace', 'i18n-dev:open-all-menu-win32-cson', () => i18nOpenCsonBatch('menu_win32.cson'))
addCmd('atom-workspace', 'i18n-dev:open-all-context-cson', () => i18nOpenCsonBatch('context.cson'))
addCmd('atom-workspace', 'i18n-dev:open-all-settings-cson', () => i18nOpenCsonBatch('settings.cson'))
addCmd('atom-workspace', 'i18n-dev:open-all-about-cson', () => i18nOpenCsonBatch('about.cson'))

// Json util

addCmd('atom-text-editor', 'json:copy-current-key-identifier', requireEditor(({ editor }) => {
  const cursor = editor.getCursorBufferPosition()
  const text = editor.getTextInBufferRange([[0, 0], [cursor.row + 1, 0]])
  const keywords = []
  text.trim()
    .replace(/\r/g,'')
    .split(/\n/)
    .forEach(line => {
      const matchKey = line.match(/['"](.+)['"]\s?:/)
      if (matchKey) { keywords.push(matchKey[1]) }
      if (line.match(/(})/)) { keywords.pop() }
    })
  atom.clipboard.write(keywords.join('.'))
  // BUG exception if value of prop is string rather than object
  // TODO support squre brcket
}))

addCmd('atom-workspace', 'util:open-style-sheet-of-current-component', requireEditor(({ editor }) => {
  const currentPath = editor.getPath()
  const currentDir = path.dirname(currentPath)
  const basename = path.basename(currentPath).split('.').slice(0, -1).join('.')
  atom.workspace.open(path.join(currentDir, 'styles', `${basename}.css`))
}))

// TODO adjust tree view width automatically by current window width
//   TODO get current window width, current tree view side pane width

addCmd('atom-workspace', 'util:open-package-i18n-setting', requireEditor(({ editor }) => {
  atom.workspace.open('atom://config/packages/atom-i18n')
}))

addCmd('atom-workspace', 'util:close-editor-in-current-and-next-pane', () => {
  if (!atom.workspace.getActivePane()) return;
  const isLastItem = atom.workspace.getActivePane().getItems().length === 1
  atom.workspace.getActivePane().getActiveItem().destroy()
  if (!isLastItem) atom.workspace.activateNextPane()
  atom.workspace.getActivePane().getActiveItem().destroy()
  atom.workspace.activatePreviousPane()
})

// TODO extend `editor:join-lines` to join lines without space elimiter
