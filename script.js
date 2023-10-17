const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const userExists = prisma.$exists.user({
    email: "sebastian.zwierzchowski@gmail.com",
  });
  
  if (userExists) {
    return;
  }

  const user = await prisma.user.create({
    data: {
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
