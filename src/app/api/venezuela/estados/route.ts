import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const estados = await prisma.estado.findMany();
    return NextResponse.json(estados, { status: 200 });
  } catch (error) {
    console.log("Error: ", (error as Error).message);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
