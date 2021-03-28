# nvm commands to add node to $PATH

# 2017-05-13 nvm automated appended  (may slow down mac)
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# set default node version by nvm:
#   run this once: $ nvm alias default 7.5.0
#   reset: $ nvm unalias default

alias nvl='nvm list'
alias nvuse='nvm use'
alias nvi='nvm install'
alias nvun='nvm uninstall'

NVM_LOAD_NVMRC=true
nvm_toggle_LOAD_NVMRC() { plToggle NVM_LOAD_NVMRC }
nvlr() { nvm ls-remote ${1:-$(node -v | cut -d. -f1)} }
nvifrom() {
  if [ ! -n "$1" ]; then echo 'require version number'; return 1; fi
  local node_version=$(nvm version node 2>/dev/null)
  nvm install $1 --reinstall-packages-from=${2:-${node_version:1}}
}

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" --no-use  # Alt: just load nvm without doing `nvm use`
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # Optional: This loads nvm bash_completion

# https://medium.com/@kinduff/automatic-version-switch-for-nvm-ff9e00ae67f3
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  if [[ -f .nvmrc && -r .nvmrc ]]; then
    nvm use
  elif [[ $(nvm version) != $(nvm version default)  ]]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
load-nvmrc-with-flag() {
  if [ "$NVM_LOAD_NVMRC" != true ]; then
    return 0
  fi
  load-nvmrc
}
add-zsh-hook chpwd load-nvmrc-with-flag
load-nvmrc-with-flag
