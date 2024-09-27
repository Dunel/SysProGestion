import prisma from "@/db";
import { fullInstituSchema, idInstituSchema } from "@/validations/institution.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const insttt = await prisma.institution.findMany({
      select: {
        id: true,
        name: true,
        parroquiaId: true,
        municipioId: true,
        estadoId: true,
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

export async function PUT(req: NextRequest) {
  try {
    const { name, estadoId, municipioId, parroquiaId, id } = await req.json();
    const result = fullInstituSchema.parse({
      name,
      estadoId,
      municipioId,
      parroquiaId,
      id,
    });
    const inst = await prisma.institution.update({
      where: {
        id: result.id,
      },
      data: {
        name,
        estadoId,
        municipioId,
        parroquiaId,
      },
      select: {
        id: true,
        name: true,
        parroquiaId: true,
        municipioId: true,
        estadoId: true,
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

export async function POST(req: NextRequest) {
  try {
    const { name, estadoId, municipioId, parroquiaId } = await req.json();
    const result = fullInstituSchema.parse({
      name,
      estadoId,
      municipioId,
      parroquiaId,
    });
    const inst = await prisma.institution.create({
      data: {
        name: result.name,
        estadoId: result.estadoId,
        municipioId: result.municipioId,
        parroquiaId: result.parroquiaId,
      },
      select: {
        id: true,
        name: true,
        parroquiaId: true,
        municipioId: true,
        estadoId: true,
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

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const result = idInstituSchema.parse({ id });
    const inst = await prisma.institution.delete({
      where: {
        id: result.id,
      },
    });
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