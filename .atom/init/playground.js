'use babel';

import fs from 'fs';
import path from 'path';

import {
  addCmd,
  requireEditor,
  requireCursor,
} from './_util';

const printAllGrammarsByPrefix = ({ prefix = '', editor }) => {
  const grms = editor
    .getGrammar()
    .registry.getGrammars()
    .map(({ scopeName }) => scopeName)
    .filter(name => name.search(prefix) >= 0)
    .sort();
  atom.notifications.addInfo(
    `all related scopes\n\n${grms.map(g => `  - \`${g}\``).join('\n')}`,
    { dismissable: true },
  );
};

addCmd(
  'atom-workspace',
  'util:get-all-grammars-html',
  requireEditor(({ editor }) => {
    printAllGrammarsByPrefix({ prefix: 'text.html', editor });
  }),
);
addCmd(
  'atom-workspace',
  'util:get-all-grammars-css',
  requireEditor(({ editor }) => {
    printAllGrammarsByPrefix({ prefix: 'source.css', editor });
  }),
);

// TODO show full path in whether tab title of status bar
// or check https://atom.io/packages/custom-title

addCmd(
  'atom-text-editor',
  'util:insert-sequential-numbers', // NOTE currently package text-pastry has similar function
  requireCursor(({ editor, cursor }) => {
    // TODO sort multiple cursors by row position numbers
    // TODO insert for each cursors
  }),
);

// NOTE enhancement for https://github.com/atom/tree-view/issues/480#issuecomment-298808837
//   expect on tree-view 223.0, perhaps atom v1.28
function enableTreeViewDrag() {
  const treeView = document.querySelector('ol.tree-view-root'); // v1.22 or higher
  const isOnPanelBackground = el =>
    el.nodeName === 'OL' && [...el.classList].includes('tree-view-root');
  if (treeView) {
    treeView.addEventListener('drop', event => {
      const {
        target,
        dataTransfer: { files },
      } = event;
      if (!files || files.length === 0 || !isOnPanelBackground(target)) {
        return;
      }
      try {
        const _path = files[0].path;
        const stat = fs.statSync(_path);
        if (stat.isDirectory()) {
          atom.project.addPath(_path);
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
}
enableTreeViewDrag();

// TODO package idea: copy all matched text when using regex

const dispatchCmdPromise = (...args) =>
  new Promise((resolve, reject) => {
    // NOTE it's async by nature
    // e.g. .then(() => dispatchCmdPromise(paneElement, 'application:open-your-init-script'))
    if (atom.commands.dispatch.apply(atom.commands, [...args])) {
      resolve(true);
    } else {
      reject(false);
    }
  });

// NOTE you can install npm here

// import R from 'ramda'
// console.log(R.sum([1,2]))

// NOTE base tag function to "curry" template literal
// f = (strings, ...args) => {...}

// let f`foo` equivalent to (__`foo`)(f)
const __ = (strings, ...args) => f => f.apply(this, [strings, ...args]);

// let f`foo` equivalent to f(..._`foo`) or f.apply(this, _`foo`)
const _ = (strings, ...args) => [strings, ...args];

// develop for made-in-taiwan project
addCmd(
  'atom-text-editor',
  'mit:tidy-up-add-shields',
  requireEditor(({ editor }) => {
    let counter = 0;
    const limit = 1000,
      result = [],
      regex = /(\d{1,}\s?)\|\s?\[@([\w-]+)\]\((.*)\)\/\[\*\*(.*)\*\*\]/g;

    editor.scan(regex, ({ match, matchText, replace, stop }) => {
      counter++;
      console.warn({ counter });
      if (counter > limit) stop();

      const [, star, author, , repo] = match;

      const mdShield = `[![💫][${repo}-shield]][${repo}]`;
      replace(matchText.replace(/^\d+\s*/, mdShield));

      const mdLink = `[${repo}]: https://github.com/${author}/${repo}\n[${repo}-shield]: https://img.shields.io/github/stars/${author}/${repo}.svg?style=flat-square&label=Stars`;
      result.push(mdLink);
    });

    editor.moveToBottom();
    editor.insertText(result.join('\n'));
  }),
);

addCmd(
  'atom-text-editor',
  'util:to-date-string',
  requireEditor(({ editor }) => {
    const selectedText = editor.getLastSelection().getText();
    atom.notifications.addInfo(`${Date(selectedText)}`);
  }),
);

addCmd(
  'atom-text-editor',
  'util:now-time',
  requireEditor(({ editor }) => {
    editor.getLastSelection().insertText(`${new Date().getTime()}`);
  }),
);
addCmd(
  'atom-text-editor',
  'util:toggle-single-trailing-new-line',
  requireEditor(({ editor }) => {
    atom.config.settings.whitespace.ensureSingleTrailingNewline = !atom.config
      .settings.whitespace.ensureSingleTrailingNewline;
  }),
);
