#!/bin/bash
BASEDIR=$(dirname "$0")
cd $BASEDIR
cd ..
git pull
yarn post:english
yarn post:chinese
cd hexo
yarn build