import { createLog } from "@/controllers/logs.controller";
import prisma from "@/db";
import {
  careerSchema,
  fullCareerSchema,
  idCareerSchema,
} from "@/validations/career.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const career = await prisma.career.findMany();
    return NextResponse.json(career, { status: 200 });
  } catch (error) {
    console.log("Error: ", (error as Error).message);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }
    const { name, short, id } = await req.json();
    const result = fullCareerSchema.parse({
      name,
      short,
      id,
    });

    const findCareer = await prisma.career.findFirst({
      where: {
        id: result.id,
      },
    });
    if (!findCareer) {
      return NextResponse.json(
        { error: "La carrera no existe." },
        { status: 400 }
      );
    }

    const career = await prisma.career.update({
      where: {
        id: result.id,
      },
      data: {
        name: result.name,
        short: result.short,
      },
      select: {
        id: true,
        name: true,
        short: true,
      },
    });

    createLog(token.cedula,  `Carrera Actualizada: ${career.name} con ID: #${career.id}`);
    return NextResponse.json("Carrera actualizada!", { status: 200 });
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

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }
    const { name, short } = await req.json();
    const result = careerSchema.parse({
      name,
      short,
    });

    const career = await prisma.career.create({
      data: {
        name: result.name,
        short: result.short,
      },
      select: {
        id: true,
        name: true,
        short: true,
      },
    });

    createLog(token.cedula,  `Carrera Creada: ${career.name} con ID: #${career.id}`);
    return NextResponse.json(career, { status: 200 });
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

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }
    const { id } = await req.json();
    const result = idCareerSchema.parse({
      id,
    });

    const findCareer = await prisma.career.findFirst({
      where: {
        id: result.id,
      },
    });
    if (!findCareer) {
      return NextResponse.json(
        { error: "La carrera no existe." },
        { status: 400 }
      );
    }

    await prisma.career.delete({
      where: {
        id: result.id,
      },
    });

    createLog(token.cedula,  `Carrera Actualizada: ${findCareer.name} con ID: #${findCareer.id}`);
    return NextResponse.json("Carrera eliminada!", { status: 200 });
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
