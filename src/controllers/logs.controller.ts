import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function getLogs(req: NextRequest) {
  try {
    const logs = await prisma.logs.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        User: {
          select: {
            role: true,
          },
        },
      },
    });

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}

export async function createLog(
  username: string,
  description: string,
  userCedula: number
) {
  try {
    const log = await prisma.logs.create({
      data: {
        userCedula,
        description,
        username,
      },
    });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
  }
}
