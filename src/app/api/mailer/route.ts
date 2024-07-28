import { NextRequest, NextResponse } from "next/server";
import emailService from "@/service/register_code/emailService";

export async function POST(req: NextRequest) {
  try {
    const { mail }: { mail: string } = await req.json();

    const resmail = await emailService.sendMail(mail, "Codigo de registro");

    return NextResponse.json(
      { message: resmail },
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
