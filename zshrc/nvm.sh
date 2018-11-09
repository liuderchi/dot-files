# nvm commands to add node to $PATH

# 2017-05-13 nvm automated appended  (may slow down mac)
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# set default node version by nvm:
#   run this once: $ nvm alias default 7.5.0
#   reset: $ nvm unalias default

alias nvml='nvm list'
alias nvmuse='nvm use'
alias nvmi='nvm install'
alias nvmun='nvm uninstall'

# nvm performance issue https://github.com/creationix/nvm/issues/860
# set default version manually avoid "nvm alias", "nvm use"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" --no-use  # just load nvm without doing `nvm use`
NODE_VERSION='v10.0.0'
export PATH="$NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH"   # insert path to override built-in node path
