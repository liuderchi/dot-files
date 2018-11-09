'use babel'

// util for markdown

import {
  addCmd,
  dispatchCmd,
  requireEditor,
  requireCursor,
  insertTextToAllSelection,
  mdInsertion,
  getYearMonthDay,
  doByPlatform,
  jumpToSearchMatch,
  replaceWordOfCurrentLine,
  getMyBufferSubscriptions,
  clearSubcriptions,
  markdownEditorsOnWillSave,
} from './_util'


addCmd('atom-text-editor', 'markdown:paste-as-link', requireEditor(({ editor }) => {
  const selection = editor.getLastSelection()
  selection.insertText(`[${selection.getText()}](${atom.clipboard.read()})`)
}))

addCmd('atom-text-editor', 'markdown:paste-as-link-in-bottom', requireEditor(({ editor }) => {
  const currentSelection = editor.getLastSelection()

  const lastCursorPosition = editor.getCursorBufferPosition()
  const selectionIsLeft = editor.getSelectedBufferRange().start.isEqual(lastCursorPosition)
  const [linkName, url] = [currentSelection.getText(), atom.clipboard.read()]

  currentSelection.insertText(`[][${linkName}]`)

  editor.moveToBottom()
  editor.moveToEndOfLine()
  currentSelection.insertText(editor.getCursors()[0].isAtBeginningOfLine()
    ? `[${linkName}]: ${url} \"${linkName}\"`
    : `\n[${linkName}]: ${url} \"${linkName}\"`
  )

  const { row: y, column: x } = lastCursorPosition
  editor.setCursorBufferPosition([ y, selectionIsLeft ? (x + 1) : (x - linkName.length + 1) ])
}))

addCmd('atom-text-editor', 'markdown:italic-text', mdInsertion`*${0}*`)
  // TODO auto select current word if no selection
  // TODO toggle back
addCmd('atom-text-editor', 'markdown:bold-text', mdInsertion`**${0}**`)

addCmd('atom-text-editor', 'markdown:paste-h1-filname', requireEditor(({ editor }) => {
  const filenameNoExt = /(.*?)(?:\.[^.]+)?$/.exec(path.basename(editor.getPath()))[1]
  const nonWordRegex = /[!-.\:-\@\[-\`\{-~]/g   // /[\W_]/g
  const fileNameCap = filenameNoExt.replace(nonWordRegex, ' ').split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  // BUG highlight error for regex = /[\/]/

  editor.getLastSelection().insertText(`# ${fileNameCap}\n`)
}))

addCmd('atom-text-editor', 'markdown:paste-today', requireEditor(({ editor }) => {
  const [year, month, day] = getYearMonthDay()
  editor.getLastSelection().insertText(`${year}-${month}-${day}`)
}))

addCmd('atom-text-editor', 'markdown:paste-time-hour-minute', requireEditor(({ editor }) => {
  editor.getLastSelection().insertText(`${(new Date()).getHours()}${(new Date()).getMinutes()} `)
}))

addCmd('atom-text-editor', 'markdown:paste-workday-count', requireEditor(({ editor }) => {
  const onBoardDay = new Date('2017-06-26')
  const dayCount = Math.ceil((new Date() - onBoardDay) / (86400 * 1000))
  const [year, month, day] = getYearMonthDay()
  editor.getLastSelection().insertText(`d${dayCount}-${month}-${day}`)
}))

addCmd('atom-text-editor', 'markdown:insert-template-for-init', requireEditor(({ editor }) => {
  const filenameNoExt = /(.*?)(?:\.[^.]+)?$/.exec(path.basename(editor.getPath()))[1]
  const nonWordRegex = /[!-.\:-\@\[-\`\{-~]/g   // /[\W_]/g
  const fileNameCap = filenameNoExt.replace(nonWordRegex, ' ').split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  const [ year, month, day ] = getYearMonthDay()
  const template = `# ${fileNameCap}\n\n## Date\n\n- ${year}-${month}-${day}\n\n## Description\n\n-\n__WIP ${year}-${month}-${day}__`
  editor.getLastSelection().insertText(template)
}))

addCmd('atom-text-editor', 'markdown:open-link-in-browser', requireCursor(({ editor, cursor }) => {
  const selectedText = editor.getLastSelection().getText()
  let [ regexResult, url ] = [ [], '' ]
  if (selectedText) {
    regexResult = /(https?\:\/{2})?(.*)\b/.exec(selectedText)
    url = regexResult ? regexResult[2] : ''
  } else {
    regexResult = /\((.+)\)/.exec(editor.lineTextForBufferRow(cursor.getBufferRow()))
    url = regexResult ? regexResult[1] : ''
  }
  atom.notifications.addInfo(`## opening url:\n- \`${url}\``)
  require('electron').shell.openExternal(url)
}))

addCmd('atom-text-editor', 'markdown:toggle-fold-code', requireEditor(({ editor }) => {
  const { Point, Range } = require('atom')
  const { row: startrow } = editor.getCursorBufferPosition()
  const styleOk2 = (row) => {
    const scope = atom.workspace.getActiveTextEditor().scopeDescriptorForBufferPosition([row,0])
    return scope.scopes.every(text => !/^comment.block/.test(text))
  }

  if (!editor.lineTextForBufferRow(startrow).match(/^\s*```\w+/) || !styleOk2(startrow)) {
    return null
  }

  let row = startrow + 1

  if (editor.isFoldedAtBufferRow(row)) {    // if folded then unfold
    return editor.unfoldBufferRow(row)
  }
  while(true) {  // else to fold: loop until meet end markup ```
    if (editor.lineTextForBufferRow(row).match(/^\s*```/) && styleOk2(row)) {
      editor.setSelectedBufferRange(new Range(new Point(startrow, Infinity), new Point(row, Infinity)))
      editor.foldSelectedLines()
      editor.setCursorBufferPosition(new Point(startrow, 0))
      break
    }
    row ++
    if (row > editor.getLastBufferRow()) {
      break
    }
  }
}))

addCmd('atom-text-editor', 'markdown:fold-url-of-link', requireEditor(({ editor }) => {
  editor.getBuffer().scan(/\]\((.+)\)|\]\[(.+)\]/g, match => {
    const { range: { start: _s, end: _e } } = match
    const { Point, Range } = require('atom')

    // NOTE create new range to exclude wrapping braces
    const url_range = new Range(new Point(_s.row, _s.column+2), new Point(_e.row, _e.column-1))
    editor.setSelectedBufferRange(url_range)
    editor.getLastSelection().fold()
  })
}))

addCmd('atom-text-editor', 'markdown:paste-WIP-progress', requireEditor(({ editor }) => {
  const [year, month, day] = getYearMonthDay()
  editor.getLastSelection().insertText(`__WIP ${year}-${month}-${day}__`)
}))

addCmd('atom-text-editor', 'markdown:jump-to-WIP-progress', jumpToSearchMatch({ regex: /(__|\*\*)WIP \d{4}-\d{2}-\d{2}/g }))

addCmd('atom-text-editor', 'markdown:update-WIP-progress', () => {
  const [year, month, day] = getYearMonthDay()
  jumpToSearchMatch({ regex: /(__|\*\*)WIP \d{4}-\d{2}-\d{2}/g })()
  replaceWordOfCurrentLine({ regex: /\d{4}-\d{2}-\d{2}/, str: `${year}-${month}-${day}` })
})

addCmd('atom-text-editor', 'markdown:update-WIP-progress-do-not-jump', requireEditor(({ editor }) => {
  const [year, month, day] = getYearMonthDay()
  editor.scan(
    /(__|\*\*)WIP \d{4}-\d{2}-\d{2}__/g,
    null,
    ({ replace }) => replace(`__WIP ${year}-${month}-${day}__`)
  )
}))

// NOTE for all editors with markdown grammar, register command to onWillSave
markdownEditorsOnWillSave('markdown:update-WIP-progress-do-not-jump')
addCmd('atom-text-editor', 'markdown:get-all-my-buffer-subscriptions', () => console.warn(getMyBufferSubscriptions()))
addCmd('atom-text-editor', 'markdown:clear-all-my-buffer-subscriptions', () => clearSubcriptions(getMyBufferSubscriptions()))

// TODO parse shell command in current line and send it to clipboard
//   NOTE if there are more then one `code` format markup, choose the one with shortest _distance_
//   NOTE show copied text in notification

// TODO sort lines in current selection
//   TODO get target selection according current selection

//   TODO split target selection

//   TODO parse splitted lines

//   TODO sort by some criteria of each line

//   NOTE if curret selection is single line,
//     try to use expand current selection to multiple lines
//     with same _indentation_
