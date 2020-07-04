// Future versions of Hyper may add additional config options,
// which will not automatically be merged into this file.
// See https://hyper.is#cfg for all currently supported options.

// NOTE default config  https://github.com/zeit/hyper/blob/canary/app/config/config-default.js

// NOTE cannot use console.log, module.require here
// TODO add theme object

// toggle hyper-pokemon
const ENABLE_POKEMON = false;

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/39077686#39077686
const hex2Rgba = (hex, opacity = 1) => {
  const rgbaArray = hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1)  // remove leading #
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))
  if (rgbaArray.length === 3) {
    rgbaArray.push(opacity)
  }
  return `rgba(${rgbaArray.join(',')})`
}

const grey = '#ccc';
const mtkOrange = '#f39a1e';
const mediumGreen = '#00ab6c';
const appleGreen = '#30d158';
const appleOrange = '#ff9f0a';
const kpTheme = '#0dd'

// theme and palette
const theme = {
  backgroundOpacity: 0.8,
  tabTitleColorDefault: hex2Rgba(grey, 0.7),
  tabTitleColorActive: grey,
  colors: {}
}

const blinkWhenTabHasActitivy = ({ color } = {}) => `
  &.tab_hasActivity > span.tab_text > span.tab_textInner {

    // NOTE breathing effect
    &::before {
      content: "";
      background-color: ${color || 'gold'};
      display: inline-block;

      -webkit-border-radius: 0.25rem;
      width: 0.5rem;
      height: 0.5rem;
      margin-right: 0.8rem;

      animation: breathe 1.5s 50;
      animation-timing-function: ease-in-out;
      -webkit-animation-timing-function: ease-in-out;
      @keyframes breathe {
        // NOTE only animate in 20% of period
        0%, 20%, 100% { opacity: 0.5; }
        10% { opacity: 1; }
      }

      // NOTE: avoid CPU usage impact when setting infinite with 100% time animating
      //   https://stackoverflow.com/questions/13176746/css-keyframe-animation-cpu-usage-is-high-should-it-be-this-way
      // transform: translateZ(0);  // NOTE not working for (before element?)
    }
  }
`;
const showDotOnTabActive = ({ color } = {}) => `
  &.tab_hasActivity > span.tab_text > span.tab_textInner {
    &::after {
      content: "";
      background-color: ${color || 'gold'};

      -webkit-border-radius: 0.2rem;
      width: 0.4rem;
      height: 0.4em;
      margin-left: 0.5rem;

      position: absolute;
      top: 0.9rem;
    }
  }
`;
const showBottomStripe = ({ color } = {}) => `
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: ${color || 'gold'};
`;
const showBottomStripeOnTabActive = ({ color } = {}) => `
  &.tab_active::after {
    transform: scaleX(1);
  }
  &::after {
    transform: scaleX(0);
    will-change: transform;
    -webkit-transition: transform 350ms ease-in;

    ${showBottomStripe({ color })}
  }
`;
const setTabWhenActive = ({ color } = {}) => `
  &.tab_hasActivity, &.tab_active {
    color: ${color || 'gold'};  // NOTE: overwrite
  }
`;

module.exports = {
  config: {
    // choose either `'stable'` for receiving highly polished,
    // or `'canary'` for less polished but more frequent updates
    updateChannel: 'stable',

    fontSize: 16,

    fontFamily: [
      // TODO: consider whether is good for icons
      // 'MesloLGS NF',  // powerlevel 10k, https://github.com/liuderchi/powerlevel10k/blob/master/README.md#meslo-nerd-font-patched-for-powerlevel10k
      'Cascadia Code',
      'Fira Code',
      'Hack Nerd Font', // Alt: 'SauceCodePro Nerd Font'
      'monospace',
    ].join(),

    // default font weight: 'normal' or 'bold'
    fontWeight: 'normal',

    // font weight for bold characters: 'normal' or 'bold'
    fontWeightBold: 'bold',

    // line height as a relative unit
    lineHeight: 1.2,

    // letter spacing as a relative unit
    letterSpacing: -0.5,

    // terminal cursor background color and opacity (hex, rgb, hsl, hsv, hwb or cmyk)
    cursorColor: hex2Rgba(appleOrange, 0.5),

    // terminal text color under BLOCK cursor
    cursorAccentColor: '#000',

    // `'BEAM'` for |, `'UNDERLINE'` for _, `'BLOCK'` for █
    cursorShape: 'BLOCK',

    // set to `true` (without backticks and without quotes) for blinking cursor
    cursorBlink: false,

    // color of the text
    foregroundColor: 'rgba(131, 148, 150, 1)',

    // terminal background color
    // opacity is only supported on macOS
    // backgroundColor: `rgba(26, 26, 26, ${theme.backgroundOpacity})`,
    backgroundColor: `rgba(26, 26, 26, 1)`,
    // NOTE (before v2.1) leads to autocomplete selected option text hidden if opacity < 1

    // terminal selection color
    selectionColor: 'rgba(193, 222, 255, 0.3)',

    // border color (window, tabs)
    borderColor: `rgba(26, 26, 26, ${theme.backgroundOpacity})`,

    // custom CSS to embed in the main window
    css: `
      .term_active .xterm-screen canvas.xterm-text-layer {
        // TODO add letter spacing for text
      }

      header > nav.tabs_nav {
        & > .tabs_title {
          font-size: 0.9rem;
          color: ${theme.tabTitleColorDefault};
        }
        & > ul > li {
          font-size: 0.8rem;
          color: ${theme.tabTitleColorDefault};
          ${setTabWhenActive({ color: theme.tabTitleColorActive})}
          ${ENABLE_POKEMON ? 'background-color: transparent!important;' : ''}
          ${
            ENABLE_POKEMON
              ? ''
              : showBottomStripeOnTabActive({ color: hex2Rgba(appleGreen, 0.5) })
          }
          ${showDotOnTabActive({ color: hex2Rgba(appleGreen, 0.6) })}
          // blinkWhenTabHasActitivy({ color: mediumGreen})
        }
      }

      // divider
      .terms_terms .splitpane_panes > .splitpane_divider {
        background-color: black!important;
      }
    `,

    // custom CSS to embed in the terminal window
    // REF: https://github.com/zeit/hyper/blob/canary/lib/components/style-sheet.js
    termCSS: ``,

    // if you're using a Linux setup which show native menus, set to false
    // default: `true` on Linux, `true` on Windows, ignored on macOS
    showHamburgerMenu: '',

    // set to `false` (without backticks and without quotes) if you want to hide the minimize, maximize and close buttons
    // additionally, set to `'left'` if you want them on the left, like in Ubuntu
    // default: `true` (without backticks and without quotes) on Windows and Linux, ignored on macOS
    showWindowControls: '',

    // custom padding (CSS format, i.e.: `top right bottom left`)
    padding: '5px',

    // the full list. if you're going to provide the full color palette,
    // including the 6 x 6 color cubes and the grayscale map, just provide
    // an array here instead of a color map object
    colors: {
      // NOTE customized iTerm2 TangoDark theme
      // black: `rgba(26, 26, 26, ${theme.backgroundOpacity - 0.5})`,
      black: `rgba(26, 26, 26, 1)`,  // for invert display
      red: 'rgba(216, 30, 0, 1)',
      green: 'rgba(94, 167, 2, 1)',
      // yellow: 'rgba(207, 174, 0, 1)',
      yellow: 'rgba(255, 193, 0, 1)',
      blue: 'rgba(66, 122, 179, 1)',
      magenta: 'rgba(137, 101, 142, 1)',
      cyan: 'rgba(0, 167, 170, 1)',
      white: 'rgba(219, 222, 216, 1)',
      lightBlack: 'rgba(104, 106, 102, 1)',
      lightRed: 'rgba(245, 66, 53, 1)',
      lightGreen: 'rgba(153, 227, 67, 1)',
      lightYellow: 'rgba(253, 235, 97, 1)',
      lightBlue: 'rgba(132, 176, 216, 1)',
      lightMagenta: 'rgba(188, 148, 183, 1)',
      lightCyan: 'rgba(55, 230, 232, 1)',
      lightWhite: 'rgba(241, 241, 240, 1)',
    },
    // configs for hyper-pokemon
    pokemon: ['dragonite', 'snorlax', 'mew', 'ditto'],
    unibody: 'true',
    poketab: 'false',

    // the shell to run when spawning a new session (i.e. /usr/local/bin/fish)
    // if left empty, your system's login shell will be used by default
    //
    // Windows
    // - Make sure to use a full path if the binary name doesn't work
    // - Remove `--login` in shellArgs
    //
    // Bash on Windows
    // - Example: `C:\\Windows\\System32\\bash.exe`
    //
    // PowerShell on Windows
    // - Example: `C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`
    shell: 'zsh',

    // for setting shell arguments (i.e. for using interactive shellArgs: `['-i']`)
    // by default `['--login']` will be used
    shellArgs: ['--login'],

    // for environment variables
    env: {},

    // set to `false` for no bell
    bell: false,

    // if `true` (without backticks and without quotes), selected text will automatically be copied to the clipboard
    copyOnSelect: false,

    // if `true` (without backticks and without quotes), hyper will be set as the default protocol client for SSH
    defaultSSHApp: true,

    // if `true` (without backticks and without quotes), on right click selected text will be copied or pasted if no
    // selection is present (`true` by default on Windows and disables the context menu feature)
    // quickEdit: true,

    // URL to custom bell
    // bellSoundURL: 'http://example.com/bell.mp3',

    // for advanced config flags please refer to https://hyper.is/#cfg

    // NOTE Plugin: hyper-pane custom config
    // NOTE: default config: https://github.com/chabou/hyper-pane#default-configuration
    paneNavigation: {
      hotkeys: {
        navigation: {
          up: 'meta+up', // NOTE meta is command
          down: 'meta+down',
          left: 'meta+left',
          right: 'meta+right',
        },
      },
      showIndicators: false, // Show pane number
      inactivePaneOpacity: 0.5, // Set to 1 to disable inactive panes dimming
    },

    // NOTE Plugin: hyper-confirm
    confirmQuit: true,
  },

  // a list of plugins to fetch and install from npm
  // format: [@org/]project[#version]
  plugins: [
    'hyper-pane',
    'hyper-search',
    'hypercwd',
    'hyper-confirm',
    ENABLE_POKEMON ? 'hyper-pokemon' : null,
  ],

  // in development, you can create a directory under
  // `~/.hyper_plugins/local/` and include it here
  // to load it and avoid it being `npm install`ed
  localPlugins: [
    // TODO plugin idea: clickable hyper link text in canvas
  ],

  keymaps: {
    'editor:moveBeginningLine': 'home', // overwrite default: "command+left"
    'editor:moveEndLine': 'end', // overwrite default: "command+right"
    // "pane:next": "command+right",   // append command to list
    'pane:splitVertical': 'command+shift+ctrl+right',
    'pane:splitHorizontal': 'command+shift+ctrl+down',
    // NOTE currently no "pane:move-to-next"
    // TODO discover more hyper commands
    //   https://github.com/zeit/hyper/blob/master/app/keymaps/darwin.json
    //   https://github.com/iamstarkov/hyper-keymap/blob/master/src/default-keymap.js
  },
};
