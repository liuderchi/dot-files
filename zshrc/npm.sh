# 2017-07-05, 2017-07-14 npm
alias npi='npm i'  # zsh plugin has npmS: 'npm i -S'
alias npisd='npm i --D'  # --save-dev
alias npinos='npm i --no-save'  # npm@5
alias npinol='npm i --no-package-lock'  # npm@5
alias nplg='npm list -g --depth=0 2>/dev/null'
alias npl='npm list --depth=0 2>/dev/null'
alias nplink='npm link'
alias npunlink='npm unlink'
alias npod='npm outdated'
alias nprun='npm run'
alias npv='npm version'
npGlobalDep() { echo $(nplg | sed 1d | cut -d\  -f2 | cut -d@ -f1) }
npruni() {
    # npi TODO interactive `npm run foo` prompt powered by ipt
    # interactive npm run foo  https://jaketrent.com/post/list-npm-scripts/
    #   list scripts using `print $(node -pe "require('./package.json').scripts.test")`
}
npmlgrep() { npm list --depth=0 2>/dev/null | grep ${1:-''} }
catPackageGrep() { cat package.json | grep ${1:-''} }
