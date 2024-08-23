#!/bin/bash
echo "Begin deployment"
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

echo "Change .env to use production database"
echo "MONGO_CONNSTRING = mongodb://127.0.0.1:27017/stocken-wiki-prod" > .env

echo "Run server"
npm run prod:start

echo "Deployment complete"


