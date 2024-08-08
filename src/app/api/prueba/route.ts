import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    console.log(session);
    if (session) {
      return NextResponse.json({ message: "Acceso autorizado" });
    }
    return NextResponse.json(
      { error: "Acceso no autorizado", step: 0 },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Acceso no autorizado", step: 0 },
      { status: 400 }
    );
  }
}
