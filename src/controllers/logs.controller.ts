import prisma from "@/db";
import { pageSchema } from "@/validations/logs.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function getLogs(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");
    const result = pageSchema.parse({ page });
    const logs = await prisma.logs.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        User: {
          select: {
            role: true,
            depInfo: {
              select: {
                name: true,
              },
            },
            alcaldiaInfo: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      skip: result.page ? (result.page - 1) * 10 : 0,
      take: 10,
    });

    const count = await prisma.logs.count();

    return NextResponse.json({ count, logs }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}

export async function createLog(userCedula: number, description: string) {
  try {
    const log = await prisma.logs.create({
      data: {
        userCedula,
        description,
      },
    });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
  }
}
