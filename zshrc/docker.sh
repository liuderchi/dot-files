# docker, docker-compose
alias dk='docker'
alias dki='docker image'
alias dkils='docker image ls'
alias dkirm='docker image rm'
alias dkb='docker build'
alias dkc='docker container'
alias dkcls='docker container ls'
alias dkcrm='docker container rm'
alias dkcre='docker container restart'
alias dkcs='docker container stop'
alias dkcp='docker container prune'
alias dkp='docker push'
alias dkps='docker ps'
alias dkpsa='docker ps -a'   # list all containers including exit
alias dkpsaq='docker ps -aq'
alias dkt='docker tag'
alias dkl='docker logs'
alias dkr='docker run'
alias dkrrm='docker run --rm'
alias dkrrmdp='docker run --rm -d -P'
dkgentag() {
  local _date=$(date +'%Y%m%d')
  local commitHash=$(git rev-parse HEAD)
  local title=${1:-$(gcurrentbranch | sed 's/\//__/g')}
  print $title-$_date-${commitHash:0:9}
}
dkgenBKPtag() {
  local _title=''
  if [ -n "$1" ]; then _title="-$1"; fi
  print bkp__$(date +'%m%d')$_title
}
dkrbash() { docker run --rm -it ${1:-''} /bin/bash }

# TODO docker run vs docker exec

alias dcomp='docker-compose'
alias dcompu='docker-compose up'
alias dcompi='docker-compose images'
alias dcomps='docker-compose stop'
alias dcompd='docker-compose down'
alias dcompre='docker-compose restart'
alias dcomprm='docker-compose rm'
alias dcompps='docker-compose ps'
