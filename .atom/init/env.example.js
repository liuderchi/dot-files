'use babel';

import path from 'path';
import { HOME_DIR, getAllFilesInDir } from './_util';

export const vscodeConfigPaths = {
  local: [
    ...getAllFilesInDir({
      dirPath: path.join(HOME_DIR, 'Library/Application Support/Code/User'),
    }),
    ...getAllFilesInDir({
      dirPath: path.join(
        HOME_DIR,
        'Library/Application Support/Code/User/snippets'
      ),
    }),
  ],
  private: [
    ...getAllFilesInDir({
      dirPath: path.join(HOME_DIR, 'PATH/TO/MY/VSCODE/CONFIG'),
    }),
  ],
};

const DOT_ATOM_FILES = [
  'init.js',
  'config.cson',
  'styles.less',
  'styles_icons.less',
  'keymap.cson',
  'snippets.cson',
];

export const atomConfigPaths = {
  local: [
    ...DOT_ATOM_FILES.map(p => path.join(HOME_DIR, '.atom', p)),
    ...getAllFilesInDir({ dirPath: path.join(HOME_DIR, '.atom/init') }),
  ],
  private: [
    ...DOT_ATOM_FILES.map(p =>
      path.join(HOME_DIR, 'PATH/TO/MY/ATOM/CONFIG', p)
    ),
    ...getAllFilesInDir({
      dirPath: path.join(HOME_DIR, 'PATH/TO/MY/ATOM/CONFIG/init'),
    }),
  ],
};

export const zshConfigPaths = {
  local: [
    path.join(HOME_DIR, '.zshrc'),
    ...getAllFilesInDir({ dirPath: path.join(HOME_DIR, 'zshrc') }),
  ],
  private: [
    path.join(
      HOME_DIR,
      'PATH/TO/MY/ZSH/CONFIG/MY.zshrc'
    ),
    ...getAllFilesInDir({
      dirPath: path.join(
        HOME_DIR,
        'PATH/TO/MY/ZSH/CONFIG/zshrc'
      ),
    }),
  ],
};

export const hyperConfigPaths = {
  local: [path.join(HOME_DIR, '.hyper.js')],
  private: [
    path.join(
      HOME_DIR,
      'PATH/TO/MY/HYPER/CONFIG/my.hyper.js'
    ),
  ],
};

export const nvmConfigPaths = {
  local: [path.join(HOME_DIR, '.nvm/default-packages')],
  private: [
    path.join(
      HOME_DIR,
      'PATH/TO/MY/NVM/CONFIG/default-packages'
    ),
  ],
};

export const tmuxConfigPaths = {
  local: [path.join(HOME_DIR, '.tmux.conf')],
  private: [
    path.join(
      HOME_DIR,
      'PATH/TO/MY/TMUX/CONFIG/My.tmux.conf'
    ),
  ],
};

export const privateConfigPaths = {
  omzThemeAgnoster: [
    path.join(HOME_DIR, '.oh-my-zsh/themes/Myagnoster.zsh-theme'),
  ],
  omzThemePowerLevel9k: [
    path.join(
      HOME_DIR,
      '.oh-my-zsh/custom/themes/powerlevel9k/powerlevel9k.zsh-theme'
    ),
  ],
  workLog: [path.join(HOME_DIR, 'PATH/TO/MY/WORKLOG')],
};
