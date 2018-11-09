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
alias brcs='brew cask search'
alias brcl='brew cask list'
alias brci='brew cask install'
alias brcuni='brew cask uninstall'
alias brcupg='brew cask upgrade'

brupgbrcupg() {
  brupg && brcupg
}


# NOTE from bgandon/brew-cask-outdated;
# https://github.com/bgandon/brew-cask-outdated
brco() {
  # Resolve the CASKROOM value, supporting its customization
  # with the HOMEBREW_CASK_OPTS environment variable
  local CASKROOM=/opt/homebrew-cask/Caskroom
  if [ -n "$HOMEBREW_CASK_OPTS" ]; then
    opts=($HOMEBREW_CASK_OPTS)
    for opt in "${opts[@]}"; do
      room=$(echo "$opt" | sed -ne 's/^--caskroom=//p')
      if [ -n "$room" ]; then
        CASKROOM=$room
        break
      fi
    done
  fi

  for formula in $(brew cask list | grep -Fv '(!)'); do
    info=$(brew cask info $formula | sed -ne '1,/^From:/p')
    new_ver=$(echo "$info" | head -n 1 | cut -d' ' -f 2)
    cur_vers=$(echo "$info" \
    | grep '^/usr/local/Caskroom' \
    | cut -d' ' -f 1 \
    | cut -d/ -f 6)
    latest_cur_ver=$(echo "$cur_vers" \
    | tail -n 1)
    cur_vers_list=$(echo "$cur_vers" \
    | tr '\n' ' ' | sed -e 's/ /, /g; s/, $//')
    if [ "$new_ver" != "$latest_cur_ver" ]; then
      echo "$formula ($cur_vers_list) < $new_ver"
    fi
  done
}
