#!/bin/sh
git reset --hard HEAD
git pull
forever stopall
npm install
grunt product
forever start -c "npm start" .
