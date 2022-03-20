# misc utils

# [misc]
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

# === === === === ===
pd() { pushd -${1:-1}}  # go find right (from top) (pushd -1 or push -X)
pd-() { pushd +${1:-0}}  # go find left (from bottom)
alias pd2='pd; pd-'
# TODO pd interactively
psAUXGrep() { psAUX | awk '{if(NR==1)print}'; psAUX | grep $1 }
grepc() { grep -C ${2:-5} $1 }
shellOptions() { print $- }
getCurrentShell() { ps -ef | grep $$ | grep -v grep }

# [autojump]
# load autojump  https://github.com/wting/autojump
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh
[ -f /opt/homebrew/etc/profile.d/autojump.sh ] && . /opt/homebrew/etc/profile.d/autojump.sh

# [gpg]
alias gpgl='gpg --list-secret-keys --keyid-format LONG'
alias gpgImport='gpg —-import'
gpgExportPublic() {
  if [ -z "$1" ]; then echo 'gpgExportPublic <id>'; return -1; fi
  gpg -a --export $1 > public.asc
}
gpgExportPrivate() {
  if [ -z "$1" ]; then echo 'gpgExportPrivate <id>'; return -1; fi
  gpg -a --export-secret-keys $1 > secret.asc
}

# [ffmpeg]
alias ffm='ffmpeg'
mov2gif() {
  # https://gist.github.com/dergachev/4627207#instructions
  if [ -z "$1" ]; then echo 'mov2gif: should specify input .mov file'; return 1; fi
  ffmpeg -i $1 \
    -vf scale=${2:-1400}:-1 -pix_fmt rgb8 -r 10 -f gif - \
    | gifsicle --optimize=3 > $(basename $1 .mov).gif
}

# [imagemagick]
alias cv='convert'
cvResize() {
  if [ -z "$1" ]; then echo 'convert: specify input file name'; return -1; fi
  if [ -z "$2" ]; then echo 'convert: specify resize arg e.g. 50%'; return -1; fi

  filename=$(basename -- "$1")
  extension="${filename##*.}"
  filenameWithoutExt="${filename%.*}"

  out="$filenameWithoutExt.$2.$extension"
  cv $1 -resize $2 $out
}
cvToPdf() {
  if [ -z "$1" ]; then echo 'convert: specify input file name'; return -1; fi
  if [ -z "$2" ]; then echo 'convert: specify output pdf'; return -1; fi

  cv $1 +adjoin $2
}
cvAllJpgToPdf() {
  cv *.jpg +adjoin page.%d.pdf
}

# [pdf]
# https://apple.stackexchange.com/a/230447
#   e.g. joinPdf -o out.merged.pdf page-*.pdf
alias joinPdf="/System/Library/Automator/Combine\ PDF\ Pages.action/Contents/Resources/join.py"
# TODO imageMagic shorhands
# - add zsh cli for imageMagic
#     1. find min/max of width/height of all images in folder
#         - WIP
#     2. resize all images to specific width/height in folder
#         - e.g. `convert -resize 2000x2000 -quality 20 image00018.jpg r2000x2000_image00018.jpg;`
#     3. `convert -append *.jpg out.jpg` shorthand
#         - c.f. `convert *.jpg out.pdf`


# [VSCode]
# https://code.visualstudio.com/docs/setup/mac
PATH="$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
vslink() { ln -s $(pwd) $HOME/.vscode/extensions/$(basename $(pwd)) }
vsunlink() {
  if [ -z "$1" ]; then echo 'vsunlink: should specify extension name'; return 1; fi
  rm -rf $HOME/.vscode/extensions/$1
}

# [bat] [prettyping]
# Improved CLI tools https://remysharp.com/2018/08/23/cli-improved
alias cat='bat'
alias ping="$HOME/prettyping --nolegend"  # install prettyping to

# [fzf] [history] [bat]
export FZF_DEFAULT_COMMAND='find * -type f -not -path "node_modules/**"'
p() { fzf --preview 'bat --color "always" {}' }
unalias h
fzfHistoryPrompt=$' \uF002  \uE0B1'  #   
fzfHistory() {
  print $( \
    ([ -n "$ZSH_NAME" ] && fc -l 1 || history) \
    | fzf +s --tac --layout=reverse --prompt="$fzfHistoryPrompt " --height=40% \
    | sed -E 's/ *[0-9]*\*? *//' \
  )
}
h() { print -z $(fzfHistory) }
hh() {
  local cmd=$(fzfHistory)
  echo "$fzfHistoryPrompt $cmd"
  eval $cmd
}
# See also https://github.com/junegunn/fzf/wiki/examples#command-history
fzfLsof() {
  # show collapse lsof result, for narrow screen width
  print $( \
    ([ -n "$ZSH_NAME" ] && lsof -nP) \
    | awk '{$6=$7=""}1' \
    | fzf +s --tac --layout=reverse --prompt="$fzfHistoryPrompt " --height=40% \
    | sed -E 's/ *[0-9]*\*? *//' \
  )
}
fp() {
  # usage1: 'LISTEN '<port>
  # usage2: 'cwd '<pid>
  local entry=$(fzfLsof)
  local entryArray=( $(echo $entry | cut -d' ' -f1-) )
  local pid=${entryArray[2]}
  if [ -z $pid ]; then return 1; fi
  print -z "# ${entry}\nkill $pid"
}

# [rust]
PATH="$PATH:$HOME/.cargo/bin"
source $HOME/.cargo/env

# [chrome] [puppeteer]
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

# [mdutil]
# management spotlight index for perf
# delete spotlight index; https://www.alfredapp.com/help/troubleshooting/indexing/ > 3. spotlight settings
#   rebuild spotlight index; https://www.alfredapp.com/help/troubleshooting/indexing/ > 5. rebuild metadata index
#   /Applications/Alfred 4.app/Contents/Frameworks/Alfred Framework.framework/Versions/A/Resources/reindexdel.sh
#   rm path/to/.Spotlight-V100 && sudo mdutil -E -i on /
# rebuild alfred app cache; https://www.alfredapp.com/help/troubleshooting/indexing/ > 6. reload app cache
alias mduOn='sudo mdutil -a -i on' # enable index build background job, required by alfred app cache reload
alias mduOff='sudo mdutil -a -i off' # disable index build background job