#!/bin/sh
echo Migrating...
npx prisma migrate deploy
echo add admin if needed
node script.js
echo start nextjs
chown -R http:http /data
sudo -g http -u http node server.js