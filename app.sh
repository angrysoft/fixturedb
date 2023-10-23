#!/bin/sh
echo Migrating...
# npm i prisma
npx prisma migrate deploy
echo add admin if needed
node script.js
echo start nextjs
ls /fixturedb-data
sudo -g http -u http node server.js