// porting init.coffee to init.js
// NOTE Atom DO NOT run init.coffee if we have init.js
// NOTE 2017-08-10 porting from coffeescript to es6
// NOTE 2018-04-28 init.js -> init/index

// == tiny customization when init
// source http://flight-manual.atom.io/hacking-atom/sections/the-init-file/

// NOTE current scope is not global (this !== global)

const path = require('path');

const scripts = [
  './markdown',
  // './json-util',
  './util',
  './playground',
];

scripts.forEach(script => {
  try {
    require(script);
  } catch (e) {
    atom.notifications.addWarning(
      `Failed to execute\n\`${path.join(__dirname, script)}\``,
      { dismissable: true },
    );
    atom.notifications.addWarning(e);
  }
});
