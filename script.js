const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

  const user = await prisma.user.upsert({
    where: {
        email: "sebastian.zwierzchowski@gmail.com",
    },
    update: {},
    create: {
      email: "sebastian.zwierzchowski@gmail.com",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
