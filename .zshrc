# NOTE comment these to toggle p10k
# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
# if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
#   source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
# fi

# NOTE this file is from $HOME/.oh-my-zsh/templates/zshrc.zsh-template

# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load. Optionally, if you set this to "random"
# it'll load a random theme each time that oh-my-zsh is loaded.
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
# ZSH_THEME="robbyrussell"
# ZSH_THEME="Myrobbyrussell"
# ZSH_THEME="agnoster"  # NOTE this requires font: Source Code Pro
# ZSH_THEME="Myagnoster"
# ZSH_THEME="powerlevel9k/powerlevel9k"
ZSH_THEME="powerlevel10k/powerlevel10k"
# ZSH_THEME="spaceship"
#ZSH_THEME="random"  # NOTE https://github.com/denysdovhan/spaceship-prompt/#oh-my-zsh

export SPACESHIP_RPROMPT_ORDER=(
   node
   git
   # TODO extract into antother file
)

# NOTE
# use $ chsh -s /bin/zsh # setup default bash source

# Set list of themes to load
# Setting this variable when ZSH_THEME=random
# cause zsh load theme from this variable instead of
# looking in ~/.oh-my-zsh/themes/
# An empty array have no effect
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
# plugin list: https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#osx
plugins=(osx \
  docker \
  kubectl \
  git \
  history \
  zsh-autosuggestions \
  zsh-syntax-highlighting \
  yarn-autocompletions \
  )
# NOTE install custom plugin with cmd:
#   git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
#   git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
#   goto https://github.com/g-plane/zsh-yarn-autocompletions
# NOTE plugin katas
#    history: hs 'git pull'  # show usage
#    debian:  di  # 'sudo dpkg -i'

# export color mode (for tmux)
export TERM="xterm-256color"

# NOTE run before oh-my-zsh.sh
POWERLEVEL9K_MODE='nerdfont-fontconfig'  # 'awesome-fontconfig'

source $ZSH/oh-my-zsh.sh

# NOTE my custom scripts for zsh theme
# after Hyper 2.1, pl9k.sh should run after oh-my-zsh.sh
# source "$HOME/zshrc/pl9k.sh"

# NOTE my custom scripts for some command
source "$HOME/zshrc/env.cfg"
source "$HOME/zshrc/git.sh"
source "$HOME/zshrc/git-extras.sh"
source "$HOME/zshrc/github.sh"
source "$HOME/zshrc/nvm.sh"
source "$HOME/zshrc/npm.sh"
source "$HOME/zshrc/yarn.sh"
source "$HOME/zshrc/brew.sh"
source "$HOME/zshrc/docker.sh"

# load autojump  https://github.com/wting/autojump
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh

# set auto suggestion color  https://github.com/zsh-users/zsh-autosuggestions/issues/12
export ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=239'    # options: magenta 22, 239

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/rsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"


## NOTE 2017-05-16 which one: alias or function command?
#  A. not runnable -> should use alias
#    e.g. grbonto
#  B. runnable and return value is usable or require default bash arg -> should use command
#    e.g. currentbranch
#  C. runnable but return value is not used -> dependent, use most readable one, considering which usage
#    e.g. aptUpdateInstall
#        1. alias aptUpdateInstall='aptUpdate; aptInstall'
#        2. aptUpdateInstall() { aptUpdate; aptInstall; }
#            note: IMO 2. is more readable in this case


alias clearHistoryZSH='rm $HISTFILE'
alias k8s='kubernetes'
alias k8ctl'kubectl'
alias lnsf='ln -sf'
alias lns='ln -s'
alias psAUX='ps -aux'
alias sourceBashrc='source ~/.bashrc'
alias sourceZshrc='source ~/.zshrc'
alias copy='pbcopy'  # pipable clipboard in macOS
alias wi='which'
alias cl='clear'
alias mdlint='markdownlint'
# npm-check-update
alias ncuu='ncu -u'
alias ncuua='ncu -ua'
alias ffm='ffmpeg'
alias ..2='../../'
alias ..3='../../../'

alias ft='flow-typed'
alias fti='flow-typed install'
alias ftu='flow-typed update'

cddirname() { cd $(dirname ${1:-$(pwd)}) }
checkReboot() { if [ -f /var/run/reboot-required ]; then echo 'reboot required'; else echo 'no need reboot'; fi }
pd() { pushd -${1:-1}}  # go find right (from top) (pushd -1 or push -X)
pd-() { pushd +${1:-0}}  # go find left (from bottom)
alias pd2='pd; pd-'
# TODO pd interactively
psAUXGrep() { psAUX | awk '{if(NR==1)print}'; psAUX | grep $1 }
grepc() { grep -C ${2:-5} $1 }
shellOptions() { print $- }
getCurrentShell() { ps -ef | grep $$ | grep -v grep }
mov2gif() {
  # https://gist.github.com/dergachev/4627207#instructions
  if [ -z "$1" ]; then echo 'mov2gif: should specify input .mov file'; return 1; fi
  ffmpeg -i $1 \
    -vf scale=${2:-1400}:-1 -pix_fmt rgb8 -r 10 -f gif - \
    | gifsicle --optimize=3 > $(basename $1 .mov).gif
}

# imageMagic
alias cv='convert'
# TODO imageMagic shorhands
# - add zsh cli for imageMagic
#     1. find min/max of width/height of all images in folder
#         - WIP
#     2. resize all images to specific width/height in folder
#         - e.g. `convert -resize 2000x2000 -quality 20 image00018.jpg r2000x2000_image00018.jpg;`
#     3. `convert -append *.jpg out.jpg` shorthand
#         - c.f. `convert *.jpg out.pdf`

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

# atom build util
clearAtomNodeModules() { rm -rf node_modules apm/node_modules script/node_modules }
buildAtomThenInstall() { ./script/build --code-sign --install }

# vscode
# Add Visual Studio Code (code)
# https://code.visualstudio.com/docs/setup/mac
PATH="$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
vslink() { ln -s $(pwd) $HOME/.vscode/extensions/$(basename $(pwd)) }
vsunlink() {
  if [ -z "$1" ]; then echo 'vsunlink: should specify extension name'; return 1; fi
  rm -rf $HOME/.vscode/extensions/$1
}

# Improved CLI tools   https://remysharp.com/2018/08/23/cli-improved?utm_campaign=CodeTengu&utm_medium=web&utm_source=CodeTengu_141
alias cat='bat'
alias ping="$HOME/prettyping --nolegend"  # install prettyping to
export FZF_DEFAULT_COMMAND='find * -type f -not -path "node_modules/**"'
p() { fzf --preview 'bat --color "always" {}' }

fzfHistoryPrompt=$' \uF002  \uE0B1'  #   
fzfHistory() {
  print $( \
    ([ -n "$ZSH_NAME" ] && fc -l 1 || history) \
    | fzf +s --tac --layout=reverse --prompt="$fzfHistoryPrompt " --height=40% \
    | sed -E 's/ *[0-9]*\*? *//' \
  )
}
unalias h
h() {
  local cmd=$(fzfHistory)
  echo "$fzfHistoryPrompt $cmd"
  eval $cmd
}
hh() { print -z $(fzfHistory) }
# See also https://github.com/junegunn/fzf/wiki/examples#command-history

# rust, cargo
PATH="$PATH:$HOME/.cargo/bin"

# Chrome, Puppeteer
chromePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
chromeCanaryPath='/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
chromiumPath='/Applications/Chromium.app/Contents/MacOS/Chromium'
startChromiumWithNewSession() {
  $chromiumPath \
    --remote-debugging-port=9222 \
    --no-first-run \
    --no-default-browser-check \
    --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
}
startChromeWithRemoteDubugging() {
  $chromePath --remote-debugging-port=9222
}

# NOTE comment these to toggle p10k
# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
