#!/bin/sh
echo Migrating...
npx prisma migrate deploy
echo add admin if needed
node script.js
echo start nextjs
sudo -g http -u http node server.jspri