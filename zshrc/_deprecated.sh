# deprecated or rarely used scripts

# [theme-spaceship]
export SPACESHIP_RPROMPT_ORDER=(
   node
   git
   # TODO extract into antother file
)

# [tmux] export color mode
export TERM="xterm-256color"

alias ..2='../../'
alias ..3='../../../'

cddirname() { cd $(dirname ${1:-$(pwd)}) }
alias mdlint='markdownlint'

alias ft='flow-typed'
alias fti='flow-typed install'
alias ftu='flow-typed update'

checkReboot() {
    if [ -f /var/run/reboot-required ];
        then echo 'reboot required';
        else echo 'no need reboot';
    fi
}

# [tmux]
alias tm='tmux'
alias tml='tmux ls'
tmn() {
  if [ -z "$1" ]; then echo 'tmux: specify target session'; return -1; fi
  tmux new -s $1
}
tma() {
  if [ -z "$1" ]; then echo 'tmux: specify target session'; return -1; fi
  tmux attach -t $1
}
tmks() {
  if [ -z "$1" ]; then echo 'tmux: specify target session'; return -1; fi
  tmux kill-session -t $1
}
tmkw() {
  if [ -z "$1" ]; then echo 'tmux: specify target window'; return -1; fi
  tmux kill-window -t $1
}

# [byobu]
alias bb='byobu'
alias bbe='byobu-enable'
alias bbd='byobu-disable'

findMarkdownHas() {
  # NOTE search file by content  https://stackoverflow.com/questions/16956810/how-do-i-find-all-files-containing-specific-text-on-linux
  grep -e ${1:-'WIP'} \
    --exclude-dir={*node_modules,*.git} \
    --include=\*.md \
    -rnw '.'   # recursive, print line number, match whole word
}

# [atom] build util
clearAtomNodeModules() { rm -rf node_modules apm/node_modules script/node_modules }
buildAtomThenInstall() { ./script/build --code-sign --install }
