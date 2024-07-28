import nodemailer from "nodemailer";
import prisma from "@/db";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

  public async sendMail(mail: string, subject: string): Promise<string> {
    try {
      const code = await prisma.coderegister.findMany({
        where: {
          mail,
        },
      });

      const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

      if (
        code.length > 0 &&
        new Date(code[0].updatedAt).getTime() + FIVE_MINUTES_IN_MS > Date.now()
      ) {
        return "Ya se ha enviado un código recientemente";
      }

      const newCode = Math.floor(100000 + Math.random() * 900000);

      if (code.length > 0) {
        await prisma.coderegister.update({
          where: {
            id: code[0].id,
          },
          data: {
            code: newCode,
          },
        });
      } else {
        await prisma.coderegister.create({
          data: {
            mail,
            code: newCode,
          },
        });
      }

      const mailOptions = {
        from: process.env.EMAIL,
        to: mail,
        subject,
        text: `Tu código de registro es: ${newCode}`,
      };

      await this.transporter.sendMail(mailOptions);
      //console.log("Correo enviado con éxito");
      return "Correo enviado con éxito";
    } catch (error) {
      //console.error("Error al enviar el correo:", error);
      throw new Error("sendmail: error");
    }
  }
}

export default new EmailService();
