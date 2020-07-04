# 2017-07-05, 2017-07-14 npm
alias npi='npm i'  # zsh plugin has npmS: 'npm i -S'
alias npisd='npm i --D'  # --save-dev
alias npinos='npm i --no-save'  # npm@5
alias npinol='npm i --no-package-lock'  # npm@5
alias nplg='npm list -g --depth=0 2>/dev/null'
alias npl='npm list --depth=0 2>/dev/null'
alias npaf='npm audit fix'
alias nplink='npm link'
alias npunlink='npm unlink'
alias npod='npm outdated'
alias nprun='npm run'
alias npv='npm version'
alias npra='npm-run-all'
alias npconf='npm config'
alias npconfl='npm config list'
npGlobalDep() { echo $(nplg | sed 1d | cut -d\  -f2 | cut -d@ -f1) }
npruni() {
    # npi TODO interactive `npm run foo` prompt powered by ipt
    # interactive npm run foo  https://jaketrent.com/post/list-npm-scripts/
    #   list scripts using `print $(node -pe "require('./package.json').scripts.test")`
}
nplgrep() { npm list --depth=0 2>/dev/null | grep ${1:-''} }
catPackageGrep() { cat package.json | grep ${1:-''} }
# require npm i -g fx
cpfx() {
  if [ -z "$1" ]; then cat package.json | fx
  else; cat package.json | fx ."$1"; fi
}
catPackageDep() { cpfx dependencies }
catPackageDevDep() { cpfx devDependencies }
catPackageScripts() { cpfx scripts }
