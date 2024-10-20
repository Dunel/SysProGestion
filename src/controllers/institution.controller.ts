import prisma from "@/db";
import {
  fullInstituSchema,
  idInstituSchema,
} from "@/validations/institution.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { createLog } from "./logs.controller";

export async function getInstitutions(req: NextRequest) {
  try {
    const insttt = await prisma.institution.findMany({
      include: {
        estado: {
          select: {
            estado: true,
          },
        },
        municipio: {
          select: {
            municipio: true,
          },
        },
        parroquia: {
          select: {
            parroquia: true,
          },
        },
      },
    });
    return NextResponse.json(insttt, { status: 200 });
  } catch (error) {
    console.log("Error: ", (error as Error).message);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function updateInstitution(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    if (!token) {
      return NextResponse.json(
        { error: "No tienes permisos para realizar esta acción." },
        { status: 401 }
      );
    }
    const { name, estadoId, municipioId, parroquiaId, id, type } =
      await req.json();
    const result = fullInstituSchema.parse({
      name,
      estadoId,
      municipioId,
      parroquiaId,
      id,
      type,
    });
    const inst = await prisma.institution.update({
      where: {
        id: result.id,
      },
      data: {
        name: result.name,
        estadoId: result.estadoId,
        municipioId: result.municipioId,
        parroquiaId: result.parroquiaId,
        type: result.type,
      },
      include: {
        estado: {
          select: {
            estado: true,
          },
        },
        municipio: {
          select: {
            municipio: true,
          },
        },
        parroquia: {
          select: {
            parroquia: true,
          },
        },
      },
    });

    createLog(token.cedula,  `Institución Actualizada: ${inst.name} con ID: #${inst.id}`);
    return NextResponse.json(inst, { status: 201 });
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

export async function createIntitution(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    if (!token) {
      return NextResponse.json(
        { error: "No tienes permisos para realizar esta acción." },
        { status: 401 }
      );
    }
    const { name, estadoId, municipioId, parroquiaId, type } = await req.json();
    const result = fullInstituSchema.parse({
      name,
      estadoId,
      municipioId,
      parroquiaId,
      type,
    });
    const inst = await prisma.institution.create({
      data: {
        name: result.name,
        estadoId: result.estadoId,
        municipioId: result.municipioId,
        parroquiaId: result.parroquiaId,
        type: result.type,
      },
      include: {
        estado: {
          select: {
            estado: true,
          },
        },
        municipio: {
          select: {
            municipio: true,
          },
        },
        parroquia: {
          select: {
            parroquia: true,
          },
        },
      },
    });

    createLog(token.cedula,  `Institución Creada: ${inst.name} con ID: #${inst.id}`);
    return NextResponse.json(inst, { status: 201 });
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

export async function deleteInstitution(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    if (!token) {
      return NextResponse.json(
        { error: "No tienes permisos para realizar esta acción." },
        { status: 401 }
      );
    }
    const { id } = await req.json();
    const result = idInstituSchema.parse({ id });
    const inst = await prisma.institution.delete({
      where: {
        id: result.id,
      },
    });

    createLog(token.cedula,  `Institución Eliminada: ${inst.name} con ID: #${inst.id}`);
    return NextResponse.json(inst, { status: 200 });
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
