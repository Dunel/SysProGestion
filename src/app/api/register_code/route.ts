import { NextRequest, NextResponse } from "next/server";
import { validateCode } from "@/service/register_code/validCode";

export async function POST(req: NextRequest) {
  try {
    const { code, mail } = await req.json();

    const validCode = await validateCode(parseInt(code), mail);

    return NextResponse.json(
      { message: validCode },
      { status: 200 }
    );
  } catch (error) {
    //console.error("Error al enviar el correo:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
