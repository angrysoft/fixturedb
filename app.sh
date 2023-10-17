#!/bin/sh
echo Migrating...
npx prisma migrate deploy
echo add admin if needed
node script.js
echo start nextjs
su -g http http -c node server.js