# 2017-06-30 brew
alias br='brew'
alias brl='brew list'
alias bri='brew install'
alias bruni='brew uninstall'
alias bru='brew update'
alias brupg='brew upgrade'
alias bro='brew outdated'
alias brs='brew search'
alias brserv='brew services'
alias brsc='brew services cleanup'
alias brinfo='brew info'
alias brdep='brew deps'  # list dependency
alias brd='brew doctor'
alias brclean='brew cleanup'  # cleanup old versions
# brew unlink  # temporarily disabling a formula

# brew casks
alias brc='brew cask'
alias brcl='brew cask list'
alias brci='brew cask install'
alias brcri='brew cask reinstall'
alias brcuni='brew cask uninstall'
alias brcupg='brew cask upgrade'
alias brcupggreedy='brew cask upgrade --greedy'
alias brco='brew cask outdated'
alias brcogreedy='brew cask outdated --greedy'  # c.f. https://github.com/bgandon/brew-cask-outdated

brupgbrcupg() {
  brupg && brcupg
}
