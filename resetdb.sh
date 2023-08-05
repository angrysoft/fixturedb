#!/bin/sh

rm -frv prisma/migrations
rm -fv prisma/dev.db
rm -fv prisma/dev.db-journal

npx prisma migrate dev --name init
npx ts-node script.ts
