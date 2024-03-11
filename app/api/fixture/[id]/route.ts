import { NextResponse } from "next/server";
import { prisma } from "../../prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { Prisma } from "@prisma/client";
import { getConOrCreateFromString } from "../utils";

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
          powerPlug: true,
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
    result.status = "fail";
    result.message = "Not found";
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
  if (!session)
    return NextResponse.json({ error: "Access denied" }, { status: 401 });

  const data = await request.json();
  if (!data) {
    return;
  }
  await updateFixture(data, Number(params.id));

  return NextResponse.json({
    data: { updated: params.id },
    status: "success",
  });
}

async function updateFixture(
  fixtureObj: { [key: string]: any },
  fixtureId: number,
) {
  const oldFixture: any = await getOldFixture(fixtureId);
  console.log(oldFixture);
  let fixtureQuery: any = {
    where: {
      id: fixtureId,
    },
    data: {},
  };

  let detailsQuery: any = {
    where: {
      id: oldFixture.details.id,
    },
    data: {},
  };

  parseFixtureData(fixtureObj, oldFixture, fixtureQuery, detailsQuery);

  console.log("MAIN");
  console.log(JSON.stringify(fixtureQuery, null, 2));
  console.log("DETAILS");
  console.log(JSON.stringify(detailsQuery, null, 2));
  try {
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
      await updateFixture(fixtureObj, fixtureId);
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

const isDifferent = (oldVal: any, newVal: any) => {
  if ((oldVal !== null || oldVal !== undefined) && oldVal !== newVal) {
    return true;
  }
  return false;
};

const getOldFixture = async (fixtureId: number) => {
  return await prisma.fixture.findUnique({
    where: {
      id: fixtureId,
    },
    include: {
      tags: true,
      fixtureType: true,
      manufacture: true,
      details: {
        include: {
          connectors: true,
          powerPlug: true,
        },
      },
    },
  });
};

const parseFixtureData = (
  fixtureObj: { [key: string]: any },
  oldFixture: any,
  fixtureQuery: any,
  detailsQuery: any,
) => {
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

      case "tags": {
        insertInclude("tags", fixtureQuery);
        fixtureQuery.data.tags = {
          set: [],
          connectOrCreate: getConOrCreateFromString(fixtureObj.tags),
        };

        break;
      }

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

      case "connectors": {
        insertInclude("connectors", detailsQuery);
        detailsQuery.data.connectors = {
          set: [],
          connectOrCreate: getConOrCreateFromString(fixtureObj.connectors),
        };
        break;
      }

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

      case "dmxModes": {
        if (oldFixture.dmxModes !== fixtureObj.dmxModes)
          detailsQuery.data.dmxModes = fixtureObj.dmxModes;
        break;
      }

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

      case "links": {
        if (oldFixture.links !== fixtureObj.links)
          detailsQuery.data.links = fixtureObj.links;
        break;
      }
    }
  }
};
