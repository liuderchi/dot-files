# docker, docker-compose
alias dk='docker'
alias dki='docker image'
alias dkils='docker image ls'
alias dkirm='docker image rm'
alias dkv='docker volume'
alias dkvp='docker volume prune'
alias dkb='docker build'

alias dkc='docker container'
alias dkcls='docker container ls'
alias dkcrm='docker container rm'
alias dkrm='docker rm'
alias dkcre='docker container restart'
alias dkre='docker restart'
alias dkcs='docker container start'
alias dks='docker start'
alias dkcss='docker container stop'
alias dkss='docker stop'
alias dkca='docker container attach'
alias dka='docker attach'
alias dkcp='docker container prune'

alias dkp='docker push'
alias dkpl='docker pull'
alias dkps='docker ps'
alias dkpsa='docker ps -a'   # list all containers including exit
alias dkpsaq='docker ps -aq'
alias dksy='docker system'
alias dksyp='docker system prune'
alias dksypvp='docker system prune && docker volume prune'
alias dkt='docker tag'
alias dkl='docker logs'
alias dkcr='docker container run'
alias dkr='docker run'
alias dkrrm='docker run --rm'
alias dkrrmdp='docker run --rm -d -P'
alias dke='docker exec'
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
dkeibash() {
  if [[ -z "$1" ]]; then echo '⚠️  usage: dkeibash MY-RUNNING-CONTAINER'; fi
  docker exec -it $1 bash
}
dkeish() {
  if [[ -z "$1" ]]; then echo '⚠️  usage: dkeish MY-RUNNING-CONTAINER'; fi
  docker exec -it $1 sh
}

alias dcomp='docker-compose'
alias dcompu='docker-compose up'
alias dcompi='docker-compose images'
alias dcomps='docker-compose stop'
alias dcompd='docker-compose down'
alias dcompre='docker-compose restart'
alias dcomprm='docker-compose rm'
alias dcompps='docker-compose ps'

alias kp='kubectl plugin'
alias keit='kubectl exec -it'
# other alias for kubect: https://github.com/robbyrussell/oh-my-zsh/blob/master/plugins/kubectl/README.md#aliases
