#!/bin/sh
git reset --hard HEAD
git pull origin master
forever stopall
npm install
grunt product
forever start -c "npm start" .
