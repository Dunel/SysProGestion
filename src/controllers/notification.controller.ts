import prisma from "@/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function getNotifications(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const notifications = await prisma.notification.findMany({
      where: {
        userCedula: token.cedula,
      },
      orderBy: {
        date: "desc",
      },
      select: {
        userCedula: true,
        action: true,
        date: true,
        application: {
          select: {
            title: true,
            type: true,
          },
        },
      },
    });
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}

export async function getNoti(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const notifications = await prisma.notification.findMany({
      where: {
        application: {
          dependencia: {
            userCedula: token.cedula,
          },
        },
      },
      select: {
        userCedula: true,
        action: true,
        date: true,
        application: {
          select: {
            title: true,
            type: true,
          },
        },
      },
      take: 20,
    });

    return NextResponse.json( notifications , { status: 200 });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}
