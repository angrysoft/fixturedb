import { NextResponse } from "next/server";
import { prisma } from "../../prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { Prisma } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const data = await prisma.fixture.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      tags: true,
      fixtureType: true,
      manufacture: true,
      details: {
        include: {
          connectors: true,
          dmxModes: true,
          powerPlug: true,
          links: true,
        },
      },
    },
  });

  const result = {
    status: "success",
    message: "",
    data: data,
  };
  if (data == null) {
    (result.status = "fail"), (result.message = "Not found");
  }
  return NextResponse.json(result);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log("delete", params.id);
    const deletedFixture = await prisma.fixture.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json({
      data: { deleted: deletedFixture },
      status: "success",
    });
  } else {
    return NextResponse.json({ error: "Access denied" }, { status: 401 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } },
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const data = await request.json();
    const fixture: any = await updateFixture(data, Number(params.id));
    return NextResponse.json({
      data: { updated: params.id },
      status: "success",
    });
  } else {
    return NextResponse.json({ error: "Access denied" }, { status: 401 });
  }
}

async function updateFixture(fixtureObj: { [key: string]: any }, id: number) {
  try {
    const oldFixture: any = await prisma.fixture.findUnique({
      where: {
        id: id,
      },
      include: {
        tags: true,
        fixtureType: true,
        manufacture: true,
        details: {
          include: {
            connectors: true,
            dmxModes: true,
            powerPlug: true,
            links: true,
          },
        },
      },
    });

    let fixtureQuery: any = {
      where: {
        id: id,
      },
      data: {},
    };

    let detailsQuery: any = {
      where: {
        id: oldFixture.details.id,
      },
      data: {},
    };

    for (const [key, val] of Object.entries(fixtureObj)) {
      switch (key) {
        case "manufacture":
          if (oldFixture?.manufacture.name !== fixtureObj.manufacture) {
            insertInclude("manufacture", fixtureQuery);
            fixtureQuery.data.manufacture = {
              connectOrCreate: {
                where: { name: fixtureObj.manufacture },
                create: { name: fixtureObj.manufacture },
              },
            };
          }
          break;

        case "model":
          updateField(
            oldFixture?.model,
            fixtureObj.model,
            "model",
            fixtureQuery,
            false,
          );
          break;

        case "weight":
        case "power":
          if (oldFixture[key])
            updateField(oldFixture[key], Number(val), key, fixtureQuery, false);
          break;

        case "tags":
          insertInclude("tags", fixtureQuery);

          const tags =
            fixtureObj.tags
              ?.split(",")
              .filter((t: any) => t.length !== 0)
              ?.map((tag: string) => {
                return {
                  where: {
                    name: tag,
                  },
                  create: {
                    name: tag,
                  },
                };
              }) || [];
          fixtureQuery.data.tags = {
            set: [],
            connectOrCreate: tags,
          };

          break;

        case "fixtureType":
          if (oldFixture?.fixtureType.name !== fixtureObj.fixtureType) {
            insertInclude("fixtureType", fixtureQuery);
            fixtureQuery.data.fixtureType = {
              connectOrCreate: {
                where: {
                  name: fixtureObj.fixtureType,
                },
                create: {
                  name: fixtureObj.fixtureType,
                },
              },
            };
          }
          break;

        // details
        case "powerPassage":
        case "outdoor": {
          const oldVal = oldFixture.details[key];
          const newVal = Boolean(val);
          if (newVal !== oldVal) {
            detailsQuery.data[key] = newVal;
          }
          break;
        }

        case "connectors":
          const connectors =
            fixtureObj.connectors
              ?.split(",")
              .filter((c: any) => c.length !== 0)
              .map((conn: string) => {
                return {
                  where: {
                    name: conn,
                  },
                  create: {
                    name: conn,
                  },
                };
              }) || [];
          insertInclude("connectors", detailsQuery);
          detailsQuery.data.connectors = {
            set: [],
            connectOrCreate: connectors,
          };
          break;

        case "powerPlug": {
          const oldVal = oldFixture.details[key];
          if (
            (oldVal.name !== null || oldVal.name !== undefined) &&
            oldVal.name !== val
          ) {
            insertInclude("powerPlug", detailsQuery);
            detailsQuery.data.powerPlug = {
              connectOrCreate: {
                where: {
                  name: val,
                },
                create: {
                  name: val,
                },
              },
            };
          }
          break;
        }

        case "dmxModes":
          const dmxModes =
            fixtureObj.dmxModes
              ?.split(",")
              .filter((d: any) => d.length >= 3)
              ?.map((dmx: string) => {
                const [name, channel] = dmx.split(":");
                return {
                  where: {
                    name_fixtureDetailsId: {
                      name: name,
                      fixtureDetailsId: oldFixture.details.id,
                    },
                  },
                  create: {
                    name: name,
                    channels: Number(channel),
                  },
                };
              }) || [];
          insertInclude("dmxModes", detailsQuery);
          detailsQuery.data.dmxModes = {
            set: [],
            connectOrCreate: dmxModes,
          };
          break;

        case "width":
        case "height":
        case "thickness":
        case "resolutionH":
        case "resolutionV":
        case "pixel": {
          const oldVal = oldFixture.details[key];
          const newVal = Number(val);
          if (oldVal !== newVal) {
            detailsQuery.data[key] = newVal;
          }
          break;
        }

        case "desc": {
          const oldVal = oldFixture.details[key];
          const newVal = val.substring(0, 319);
          if (oldVal !== newVal) {
            detailsQuery.data.desc = newVal;
          }
          break;
        }
      }
    }

    console.log("MAIN");
    console.log(JSON.stringify(fixtureQuery, null, 2));
    console.log("DETAILS");
    console.log(JSON.stringify(detailsQuery, null, 2));
    const newFixture = await prisma.fixture.update(fixtureQuery);
    const newDetails = await prisma.fixtureDetails.update(detailsQuery);
    return { ...newFixture, ...{ details: newDetails } };
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e);
      if (e.code === "P2002") {
        console.log("There is a unique constraint violation");
      }
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      await updateFixture(fixtureObj, id);
    } else {
      throw e;
    }
  }
}

const updateField = (
  oldValue: any,
  newValue: any,
  name: string,
  query: any,
  include: boolean,
) => {
  if (!oldValue || oldValue === newValue) return;
  if (include) insertInclude(name, query);
  query.data[name] = newValue;
};

const insertInclude = (name: string, query: any) => {
  if (!query.include) query.include = {};
  query.include[name] = true;
};

const compareValues = (oldVal: any, newVal: any) => {
  if ((oldVal !== null || oldVal !== undefined) && oldVal !== newVal) {
    return true;
  }
  return false;
};

const compareValueArray = (oldVal: any, newVal: any) => {
  if (oldVal.length !== newVal.length) return false;
  return false;
};
