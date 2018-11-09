'use babel'

// util for other scripts
import path from 'path'
import os from 'os'
import fs from 'fs'

const HOME_DIR = os.homedir()
const CURSOR_MOVE_BIG = 10

// bind context to make alias function
const addCmd = atom.commands.add.bind(atom.commands)
const dispatchCmd = atom.commands.dispatch.bind(atom.commands)

// function wrappers to prepare editor for inner fcn
const requireEditor = fcn => (...args) => {
  let editor
  if (!(editor = atom.workspace.getActiveTextEditor())) { return console.warn('[.atom/init/_util.js] no active editor') }
  return fcn({ editor }, ...args)
}
const requireCursor = fcn => (...args) => {
  let cursor, editor
  if (!(editor = atom.workspace.getActiveTextEditor())) { return console.warn('[.atom/init/_util.js] no active editor') }
  if (!(cursor = editor.getLastCursor())) { return console.warn('[.atom/init/_util.js] no active cursor') }
  return fcn({ editor, cursor }, ...args)
}
const bindActiveCursor = fcn => (...args) => {
  if (!(this.editor = atom.workspace.getActiveTextEditor())) { return console.warn('[.atom/init/_util.js] no active editor') }
  if (!(this.cursor = this.editor.getLastCursor())) { return console.warn('[.atom/init/_util.js] no active cursor') }
  return fcn.apply(this, ...args)  // NOTE bind cursor, editor to fcn
}

const getCurrentLine = requireCursor(({ editor, cursor }) => (
  editor.getTextInBufferRange(cursor.getCurrentLineBufferRange({ includeNewline: false }))
))

const paintWarnColorToLineEndUI = (styleToWarn = 'CRLF') => {
  const lineEndDOM = document.querySelector('status-bar a.line-ending-tile')
  if (!lineEndDOM) { return null }
  // NOTE can we load .less color variable in init.config ?
  const [ COLOR_SUBTLE, COLOR_WARN ] = [ '#777', '#ff982d' ]  // NOTE @text-color-subtle from ui-variables.less
  const { style, textContent: lineEnd } = lineEndDOM
  style.color = (lineEnd === styleToWarn) ? COLOR_WARN : COLOR_SUBTLE   // this overwrite what style.less does
}

const applyDynamicCursorWidthByFontSize = () => {
  const mapFontSizeToCursorWidth = fz => fz >= 12 ? (fz / 1.8) : 4
  const setCursorWidth = width => {
    document.querySelectorAll('atom-text-editor.editor .cursor')
      .forEach(cursorDom => cursorDom.style['borderWidth'] = `${width}px`)
  }
  atom.config.onDidChange(
    'editor.fontSize',
    ({ newValue }) => setCursorWidth(mapFontSizeToCursorWidth(newValue))
  )
  atom.workspace.observeActivePaneItem(() => setTimeout(
    () => setCursorWidth(mapFontSizeToCursorWidth(atom.config.get('editor.fontSize'))),
    1000
  ))
}

const getCamelCaseNameFromPath = (filePath) => {
  const [ _, filenameNoExt ] = /(.*?)(?:\.[^.]+)?$/.exec(path.basename(filePath))
  return filenameNoExt
    .replace(/[\W_]/g, ' ')
    .replace(/\w+/g, match => match[0].toUpperCase() + match.slice(1))
    .replace(/\s+/g, '')
}

const insertTextToAllSelection = templateStr => requireEditor(({ editor }) => {
  editor.getSelections().forEach(selection => {
    selection.insertText(templateStr.replace('!', selection.getText()))
  })
})

// use tag function to parse template string passed in
const mdInsertion = ([s, ...restStr] , ...args) => requireEditor(({ editor }) => {
  editor.getSelections().forEach(selection => {
    const selectedText = selection.getText()
    const res = [s]
    args.forEach((arg, i) => res.push(`${selectedText}${restStr[i]}`))
    selection.insertText(res.join(''))
  })
})

const i18nOpenCsonBatch = (fileName) => {
  let pane = {}
  if (!(pane = atom.workspace.getActivePane())) { return }

  const projRoot = path.join(HOME_DIR, 'atom-i18n')
  const csons = fs.readdirSync(path.join(projRoot, 'def'))
                  .map(locale => path.join(projRoot, 'def', locale, fileName))
                  .filter(f => fs.existsSync(f))
                  .filter(f => fs.statSync(f).isFile())
  csons.reduce((cur, next) => cur.then(() => atom.workspace.open(next)), Promise.resolve('start'))
    .catch(err => console.error(err))
}

// NOTE polyfill for String.padStart
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

const getYearMonthDay = (date = new Date()) => ([
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, "0"),
  String(date.getDate()).padStart(2, "0"),
])

const jumpToSearchMatch = ({ regex, offset = 0 }) =>
  requireEditor(({ editor }) => {
    const WHOLE_RANGE = [[0, 0], [editor.getLastBufferRow(), 999]];
    editor.backwardsScanInBufferRange(
      regex,
      WHOLE_RANGE,
      ({ range: { start } }) => {
        editor.setCursorBufferPosition(start.translate([0, offset]))
        editor.scrollToBufferPosition(start, { center: true })
      }
    )
  })

const replaceWordOfCurrentLine = ({ regex, str }) => {
  requireCursor(({ editor, cursor }) => {
    editor.scanInBufferRange(
      regex,
      cursor.getCurrentLineBufferRange({ includeNewline: false }),
      ({ replace }) => replace(str)
    )
  }).call()
}

const getAllFilesInDir = ({ dirPath, depth = 1 }) => {
  const blackList = ['.DS_Store']
  return fs.readdirSync(dirPath)
    .filter(f => !blackList.includes(f))
    .map(f => path.join(dirPath, f))
    .filter(f => fs.statSync(f).isFile())
}

// TODO fix logic for supporting no editor opened
// BUG when no editor opened, this fcn won't returns a promise
const openFiles = ({ paths = [], splitPane = '' }) => requireEditor(({ editor }) => {
  if (splitPane) {
    if (!dispatchCmd(atom.views.getView(editor), `pane:split-${splitPane}`)) return Promise.reject(null)
  }
  return paths.reduce((cur, next) => cur.then(() => atom.workspace.open(next)), Promise.resolve('start'))
})

const openAllFilesInDir = ({ dirPath, splitPane = '' }) => openFiles({
  paths: getAllFilesInDir({ dirPath }),
  splitPane
})

// Register open file commands for a set of file paths
const registerOpenFileCommands = ({ prefix = "util:open", paths }) => {
  addCmd(
    "atom-workspace",
    `${prefix}-all-files`,
    openFiles({
      paths,
      splitPane: "left"
    })
  )
  paths.forEach(p => {
    addCmd(
      "atom-workspace",
      `${prefix}-${path.basename(p)}`,
      openFiles({ paths: [p] })
    )
  })
}

const registerDiffFileCommands = ({
  name = "util:diff-files",
  pathGroups = []
}) => {
  addCmd("atom-workspace", name, () =>
    pathGroups.reduce(
      (acc, pathGroup) =>
        acc.then(
          openFiles({
            paths: pathGroup,
            splitPane: "left"
          })
        ),
      Promise.resolve("start")
    )
  )
}

// NOTE prepare a set to manage disposable subscription for editor onWillSave
// ref https://discuss.atom.io/t/activate-on-save-event/11089/2
const myBufferSubscriptions = new Set()
const myBufferSubMaxLimit = 15
const getMyBufferSubscriptions = () => myBufferSubscriptions

const clearSubcriptions = (subscriptions: Set) => {
  subscriptions.forEach(sub => sub.dispose())
  subscriptions.clear()
}

const _editorOnWillSave = ({command, editor, subscriptions /*: Set*/}) => {
  subscriptions.add(editor.getBuffer().onWillSave(() => {
    // TODO extend command: string -> commandOrCallback: string|function
    atom.commands.dispatch(atom.views.getView(editor), command)
      .then(res => {
        // TODO try to determine command is successful
        console.warn({ res })
        if (res === true) {
          console.info(`Save WIP progress in ${editor.getFileName()}`)
        } else {
          console.warn(`Failed to save WIP progress in ${editor.getFileName()}`)
        }
      })
  }))
}

const markdownEditorsOnWillSave = (command: string) => {
  // NOTE for all editors with markdown grammar, register command to onWillSave
  atom.workspace.observeTextEditors(editor => {
    if (editor.getGrammar().scopeName === 'source.gfm') {
      _editorOnWillSave({command, editor, subscriptions: myBufferSubscriptions})
    }
    if (myBufferSubscriptions.size > myBufferSubMaxLimit) {
      clearSubcriptions(myBufferSubscriptions)
      atom.workspace.getTextEditors()
        .filter(_editor => _editor.getGrammar().scopeName === 'source.gfm')
        .forEach(_editor => _editorOnWillSave({command, editor: _editor, subscriptions: myBufferSubscriptions}))
    }
  })
}

const removeCurrentEditorDescription = () => {
  // TODO
}

export default {
  HOME_DIR,
  CURSOR_MOVE_BIG,
  addCmd,
  dispatchCmd,
  requireEditor,
  requireCursor,
  bindActiveCursor,
  paintWarnColorToLineEndUI,
  applyDynamicCursorWidthByFontSize,
  getCurrentLine,
  getCamelCaseNameFromPath,
  insertTextToAllSelection,
  mdInsertion,
  i18nOpenCsonBatch,
  getYearMonthDay,
  jumpToSearchMatch,
  replaceWordOfCurrentLine,
  getAllFilesInDir,
  openFiles,
  openAllFilesInDir,
  registerOpenFileCommands,
  registerDiffFileCommands,
  getMyBufferSubscriptions,
  clearSubcriptions,
  markdownEditorsOnWillSave,
}
