

const { PrismaClient, Prisma } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();
const fixtures: FixtureObject[] = [];
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function walkDir(dir: string, callback: CallableFunction) {
  fs.readdirSync(dir).forEach( async (f: any) => {
    let dirPath = path.join(dir, f);
    fs.statSync(dirPath).isDirectory() ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
};

async function loadFile(filePath:string) {
  if (! filePath.endsWith(".json"))
    return;
  const data = fs.readFileSync(filePath, "utf8");
  fixtures.push(JSON.parse(data));
}

type FixtureObject  = {
  type: string
  name: string
  weight: number
  manufacture: string
  power: number
  powerPassage: boolean
  connector: string[]
  dmxModes?: DmxMode[]
  powerPlug: string
  outdoor: boolean
  width? : number
  height?: number
  thickness?: number
  resolutionH?: number
  resolutionV?: number
  pixel?: number
  desc?: string
  files?: DownloadFile[]
  tags?: string[]

}

type DownloadFile = {
  name: string
  usl: string
}

type DmxMode = {
  name: string
  channels: number
}

async function importFixture(fixtureObj: FixtureObject, indx:number) {
  console.log(indx, " Importing: ", fixtureObj.name);
  const tags = fixtureObj.tags?.map((tag)=>{
    return {
      where:{
        name: tag,
      },
      create: {
        name:tag,
      }
    }
  }) || [];

  const connectors = fixtureObj.connector.map((conn)=>{
    return {
      where: {
        name: conn
      },
      create: {
        name: conn
      }
    }
  }) || [];


  const dmxModes = fixtureObj.dmxModes?.map((dmx) =>{
    return {
      where: {name: dmx},
      create: {name: dmx},
    }
  }) || [];

  try {
    const fixture = await prisma.fixture.create({
      include: {
        tags: true,
        details:{
          include: {
            connectors: true,
          }
        }
      },
      data: {
        model: fixtureObj.name,
        fixtureType: {
          connectOrCreate:{
            where:{
              name: fixtureObj.type
            },
            create:{
              name: fixtureObj.type
            }
          }
        },
        manufacture: {
          connectOrCreate:{
            where:{
              name: fixtureObj.manufacture
            },
            create:{
              name: fixtureObj.manufacture
            }
          }
        },
        weight: fixtureObj.weight,
        power: fixtureObj.power,
        tags: {
          connectOrCreate: tags,
        },
        details: {
        create: {
            powerPassage: fixtureObj.powerPassage,
            connectors: {
              connectOrCreate: connectors
            },
            dmxModes: {
              create: fixtureObj.dmxModes || [],
            },
            powerPlug: {
              connectOrCreate:{
                where:{
                  name: fixtureObj.powerPlug
                },
                create:{
                  name: fixtureObj.powerPlug
                }
              }
            },
            outdoor: fixtureObj.outdoor || false,
            files: {
              create: fixtureObj.files || [],
            },
            desc: fixtureObj.desc || "",
            width: fixtureObj.width,
            height: fixtureObj.height,
            thickness: fixtureObj.thickness,
            resolutionH: fixtureObj.resolutionH,
            resolutionV: fixtureObj.resolutionV,
            pixel: fixtureObj.pixel,
          }
        },
      }
    });

  console.log(fixture);
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e)
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError){
      await importFixture(fixtureObj ,indx);
    } else{
      throw e
    }
  }
}

async function main() {
  // walkDir("files", loadFile);
  // console.log("length", fixtures.length);
  // fixtures.forEach(async (fix, indx) => {
  //   await importFixture(fix, indx);
  // });

  const user = await prisma.user.create({
    data: {
      email:"sebastian.zwierzchowski@gmail.com"
    }
  })
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

