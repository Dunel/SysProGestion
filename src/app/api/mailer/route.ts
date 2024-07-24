import { NextRequest, NextResponse } from 'next/server';
import  emailService from "@/service/register_code/emailService";

export async function GET(req: NextRequest) {
  try {
    //const { to, subject, text } = await req.json();

    await emailService.sendMail(
        "daniel.amaya18@gmail.com",
        "Bienvenido a nuestra aplicación",
        `Hola Dunel, bienvenido a nuestra plataforma.`
      );
    return NextResponse.json({ message: 'Correo enviado con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
