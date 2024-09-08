import prisma from "@/db";
import { venezuelaSchema } from "@/validations/venezuela.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const  estadoId  = req.nextUrl.searchParams.get("estadoId");
    const result = venezuelaSchema.shape.idEstado.parse(estadoId);
    const municipios = await prisma.municipio.findMany({
      where: {
        estadoId: result
      },
    });
    return NextResponse.json(municipios, { status: 200 });
  } catch (error) {
    console.log("Error: ", (error as Error).message);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
