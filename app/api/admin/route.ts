import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Error from "next/error";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    return NextResponse.json(session);
  } else {
    return NextResponse.json({error:"Access denied"}, {status:401})
  }
}