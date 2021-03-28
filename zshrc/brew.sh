# 2017-06-30 brew
alias br='brew'
alias brl='brew list'
alias brlf='brew list --formula'
alias brlc='brew list --cask'
alias bri='brew install'
alias brif='brew install --formula'
alias bric='brew install --cask'
alias brri='brew reinstall'
alias bruni='brew uninstall'
alias bru='brew update'
alias brupg='arch -arm64 brew upgrade'
alias brupgf='arch -arm64 brew upgrade --formula'
alias brupgc='arch -arm64 brew upgrade --cask'
alias brupgcgreedy='brew upgrade --cask --greedy'
alias brof='brew outdated --formula'
alias broc='brew outdated --cask'
alias brocgreedy='brew outdated --cask --greedy'  # c.f. https://github.com/bgandon/brew-cask-outdated
alias brs='brew search'
alias brserv='brew services'
alias brsc='brew services cleanup'
alias brinfo='brew info'
alias brdep='brew deps'  # list dependency
alias brd='brew doctor'
alias brclean='brew cleanup'  # cleanup old versions
# brew unlink  # temporarily disabling a formula

# export installed formulae
export PATH="/usr/local/sbin:$PATH"
