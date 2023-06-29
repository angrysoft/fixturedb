import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const query =  (await request.formData()).get("query");
  console.log("query", query);

  const testData = {
    status:"success",
    data:[
      {
        type: "light",
        name: "ChromaBatten 500",
        manufacture: "Pulsar",
        weight: 6.4,
        power: 100,
        powerPassage: false,
        connector: [
            "DMX 5pin"
        ],
        dmxModes: [
            {
                name: "3ch",
                channels: 3
            },
            {
                name: "6ch",
                channels: 6
            }
        ],
        powerPlug: "Schuko (230V)"
      }
  ]};

  return NextResponse.json(testData);

}