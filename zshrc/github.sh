# use $GH_LOGIN, $GH_TOKEN from personal.cfg

# Github REST API

ghUpstreamUrl() {
    local repoName=${1:-$(gRepoName)}
    local responseFile='repoInfo.json'
    curl -f https://api.github.com/repos/$GH_LOGIN/$repoName -H "Authorization: token $GH_TOKEN" > $responseFile &&\
    print $(node -pe "require('./$responseFile').source.clone_url") &&\
    rm $responseFile
}

ghRemoteAddUpstream() {
    local repoName=$1    # NOTE get current repo name
    local remoteUrl=$(ghUpstreamUrl $repoName)
    g remote add upstream $remoteUrl &&\
    echo "added $remoteUrl to upstream remote"
}

ghSyncRepoWithUpstream() {  # NOTE by entering personal fork repo, sync it with upstream repo
    local repoName=$1
    g clone "https://github.com/$GH_LOGIN/$repoName.git" &&\
    cd $repoName &&\
      g remote add upstream $(ghUpstreamUrl $repoName) &&\
      gfprune &&\
      gco master && gb -u upstream/master &&\

    gsync master &&\
    # NOTE may mave merge conflict issue

    echo "\n$GH_LOGIN/$repoName has been updated with upstream\nDeleting downloaded repo..." &&\
    cd ../ &&\
      rm -rf ./$repoName &&\
    echo 'Completed\n'
}
ghArchiveRepo() {
    # NOTE CANNOT unarchive repo via API https://developer.github.com/v3/repos/#edit | require token have access of `public_repo`
    local repoName=$1
    curl -f -X PATCH https://api.github.com/repos/$GH_LOGIN/$repoName \
      -H "Authorization: token $GH_TOKEN" \
      -d "{\"name\": \"$repoName\", \"archived\": true}" > /dev/null && \
      # NOTE name field is required
    echo "repo $GH_LOGIN/$repoName has been archived\n"
}
ghDeleteRepo() {  # NOTE https://developer.github.com/v3/repos/#edit | require token have access of `delete_repo`
    local repoName=$1
    curl -f -X DELETE https://api.github.com/repos/$GH_LOGIN/$repoName \
      -H "Authorization: token $GH_TOKEN" > /dev/null &&\
    echo "repo $GH_LOGIN/$repoName has been deleted\n"
}
ghStarRepo() {  # https://developer.github.com/v3/activity/starring/#star-a-repository | NOTE you'll need to set Content-Length to zero when calling out to this endpoint
    _getUpstreamFullName() {  # NOTE it's not accessible outside of the function
        local repoName=$1
        local responseFile='repoInfo.json'
        curl -f https://api.github.com/repos/$GH_LOGIN/$repoName -H "Authorization: token $GH_TOKEN" > $responseFile &&\
        print $(node -pe "require('./$responseFile').source.full_name") &&\
        rm $responseFile
    }
    curl -f -X PUT https://api.github.com/user/starred/$(_getUpstreamFullName $1) -H "Authorization: token $GH_TOKEN" > /dev/null
    echo 'star success'
}
ghUnStarRepo() { curl -f -X DELETE https://api.github.com/user/starred/$(_getUpstreamFullName $1) -H "Authorization: token $GH_TOKEN" > /dev/null; echo 'Unstar success'}
ghstarThenArc() { ghStarRepo $1 && ghArchiveRepo $1}
ghstarThenSync() { ghStarRepo $1 && ghSyncRepoWithUpstream $1}
ghstarThenDel() { ghStarRepo $1 && ghDeleteRepo $1}

ghRepoInfo() {
    local repoFullName=${1:-"$GH_LOGIN/$(gRepoName)"}
    local propPath=${2:-'full_name'}     # local propPath=${2:-'stargazers_count'}
    local responseFile='repoInfo.json'
    echo "fetching $propPath from $repoFullName..."
    curl -f https://api.github.com/repos/$repoFullName -H "Authorization: token $GH_TOKEN" > $responseFile &&\
    echo $(node -pe "require('./$responseFile').$propPath") &&\
    rm $responseFile
}
# TODO github label  https://gist.github.com/liuderchi/8d1c8e0a74fd690523288acedd163682
