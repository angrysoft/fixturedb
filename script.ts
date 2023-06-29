const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();


function walkDir(dir: string, callback: CallableFunction) {
  fs.readdirSync(dir).forEach( (f: any) => {
    let dirPath = path.join(dir, f);
    fs.statSync(dirPath).isDirectory() ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
};

function loadFile(filePath:string) {
  console.log(filePath);
  fs.readFile(filePath, "utf8", (err:any, data: string) => {
    importFixture(data);
  })
}

function importFixture(data: string) {
  const fixture = JSON.parse(data);
  console.log(fixture);
}

async function main() {
  walkDir("files", loadFile)
  const plug = await prisma.powerPlug.upsert({
    where: {name:"PowerCon True 1"},
    update:{
      name: "PowerCon TRUE 1"
    },
    create: {
      name: "PowerCon TRUE 1"
    }
  });
  console.log(plug);

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

