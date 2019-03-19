# NOTE use $GH_LOGIN, $EMAILS from personal.cfg
# NOTE use git alias declared in `$ZSH/oh-my-zsh.sh`: g, gb, gc, gco, gf, gm, gl, gp
# NOTE should run after `oh-my-zsh.sh`; (alias declare order matters)

gcurrentbranch() { git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/' }

# git
alias gs='git status'  # overwrite ghostscript (Sep 9 16')
alias gbmergable='gb -vv | grep behind'  # show branches mergable with remote
alias gbf='gb -f'
alias gclone='git clone'
alias gcaamend='git commit -a --amend'
alias gcaamendnoedit='git commit -a --amend --no-edit'
alias gcamend='git commit --amend'
alias gcamendnoedit='git commit --amend --no-edit'
alias gcAllowEmpty='gc --allow-empty'
alias gcpn='git cherry-pick -n'
alias grbonto='grb --onto'  # zsh has grb: 'git rebase'
alias grbabort='grb --abort'
alias greset='git reset'
alias gresethard='git reset --hard'
alias gshow='git show'    # show detail of commit(s) separately
alias gstl='git stash list'
alias glprune='gl --prune'  # use zsh alias gl: git pull (Dec 20 16')
alias gfprune='gf --all --prune'  # use zsh alias gf: git fetch (Apr 21 17')
alias gconf='git config'
alias gconfg='git config --global'
alias gconfunset='git config --unset'
alias gconfunsetg='git config --unset --global'
alias gpf='gp --force-with-lease'
alias gptags='gp --follow-tags'
alias grefl='git reflog'
alias gmv='git mv'

gco-() { gco - }
gpoCurrentbranch() { gp origin $(gcurrentbranch) } # use zsh alias in custom alias 'gp', push current branch to origin (Jan 5 17')
gpoCurrentbranchTracking() { gp origin -u $(gcurrentbranch) }
gpod() { gp origin --delete ${1:-$(gcurrentbranch)} }
gloa--() { git log --all -- $1 }  # log with --all option to includes commits involves renaming
grbMasterPush() { gco ${1:-$(gcurrentbranch)} && grb ${1:-$(gcurrentbranch)} && grb master && gp -f }
gfpmergable() { gfprune && gbmergable } # fetch with prune and show mergable branches
gdCommitCount() { git diff ${1:-HEAD}~$2 ${1:-HEAD} }    # show diff of some range of commits starting from specific one
gconflist() { gconf --list --show-origin }
gconflistglobal() { gconf --list --global --show-origin }
gconfshowUser() { gconf user.name; gconf user.email }
gconfsetgpg() { gconf commit.gpgsign true }
gconfsetpager() { gconf --global pager.branch 'cat' }
gconfsetNameEmail() { gconf user.name $GH_LOGIN; gconf user.email $EMAILS[1] }
gconfsetHttpsClone() { gconf --global url."https://".insteadOf git:// }
glistAllAuthors() { g log --format='%an < %ae >' | sort -u }
_generateBranch() {
  local _prefix=${1:-''}
  local _title=''
  if [ -n "$2" ]; then _title="-$2"; fi
  local _date=$(date +'%m%d/%I-%M%p')   # NOTE fails if res='$(date +"%m-%d")'.  double quote for _template string_
  echo -n $(print "$_prefix/$_date$_title" | awk '{ gsub (" ", "", $0); print}' | awk '{print tolower($0)}' )   # NOTE remove space and lower branch name
}
gbackupBranch() {  # NOTE create a brach with timestamp for backup.   https://stackoverflow.com/questions/13210880/replace-one-substring-for-another-string-in-shell-script
  local branch=$(_generateBranch bkp $1)
  git branch $branch && echo "created branch: $branch"
}
gNoteOnBranch() {
  local branch=$(_generateBranch note $1)
  git branch $branch && echo "created branch: $branch"
}
gbmove() {   # move branch to other reference without checking out
  if [ -z "$1" ]; then echo 'gbmove: You need to provide a branch to move'; return -1; fi
  gbf $1 ${2:-HEAD}
}
gmergeBy() {  # merge some branch into current branch without changing file system
  gbmove $1 && gco $1
}
grbontoFromCurrentTo() {
  if [ -z "$1" ]; then echo 'grbontoFromCurrentTo: should specify a target ref'; return 1; fi
  local target=$1
  local sourceRoot=$(g merge-base HEAD $1)  # fork point as default
  if [ -n "$2" ]; then sourceRoot="HEAD~$2"; fi

  echo "doing grbonto $target $sourceRoot ..."
  grbonto $target $sourceRoot
}
grbontoToCurrentFrom() {
  if [ -z "$1" ]; then echo 'grbontoToCurrentFrom: should specify a target ref'; return 1; fi
  local source=$1
  local sourceRoot=$(g merge-base HEAD $1)  # fork point as default
  if [ -n "$2" ]; then sourceRoot="$source~$2"; fi

  echo "doing grbonto HEAD $sourceRoot $source ..."
  grbonto HEAD $sourceRoot $source
}
grmuntrackfiles() { rm $(git ls-files --others --exclude-standard) }
gsync() { gco $1 && gl && gp origin }   # sync current branch by mergin if not arg specified
gsyncRebase() { gco $1 && grbonto upstream/${1:-$(gcurrentbranch)} HEAD && gp origin -f }   # sync current branch by rebasing if not arg specified
gRepoName() { basename -s .git $(git config --get remote.origin.url) }
gIgnoreCheck() { git check-ignore -v * }  # who ignore my file?

export GIT_EDITOR='code --wait'
