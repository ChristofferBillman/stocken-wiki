#!/bin/bash
echo "Begin deployment"
cd /stocken-wiki
git pull origin master

echo "Stop server"
npm run prod:stop

echo "Install deps"
npm run ci

echo "Build frontend"
cd /client
npm run build
cd ..

echo "Build backend"
cd /server
npm run build

echo "Run server"
npm run prod:start

echo "Deployment complete"


