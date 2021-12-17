#!/bin/bash
PATH="/usr/local/node/bin:/usr/local/bin:/usr/bin:/bin"
BASEDIR=$(dirname "$0")
cd $BASEDIR
cd ..
git pull
npm run post:english
npm run post:chinese
cd hexo
npm run build
