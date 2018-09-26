#!/bin/sh

set -e

git merge --no-ff \
  -m "merge derek branches at $(date +'%m%d/%I-%M%p')" \
  $(git branch | grep '  derek/' | cut -d, -f2- | tr '\n' ' ' | sed 's/,$//')
