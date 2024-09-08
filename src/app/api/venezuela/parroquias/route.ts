import prisma from "@/db";
import { venezuelaSchema } from "@/validations/venezuela.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const municipioId = req.nextUrl.searchParams.get("municipioId");
    const result = venezuelaSchema.shape.idMunicipio.parse(municipioId);
    const parroquias = await prisma.parroquia.findMany({
      where: {
        municipioId: result
      },
    });
    return NextResponse.json(parroquias, { status: 200 });
  } catch (error) {
    console.log("Error: ", (error as Error).message);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
