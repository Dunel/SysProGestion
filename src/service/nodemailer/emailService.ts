import nodemailer from "nodemailer";

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

  public async sendMail(
    mail: string,
    text: string,
    subject: string,
    link: string
  ): Promise<string> {
    try {
      let mailOptions;
      if (link !== "") {
        mailOptions = {
          from: process.env.EMAIL,
          to: mail,
          subject: subject,
          html: `<p>${text}</p><a href="${link}">${link}</a>`,
        };
      } else {
        mailOptions = {
          from: process.env.EMAIL,
          to: mail,
          subject: subject,
          html: `conn<p>${text}</p>`,
        };
      }

      await this.transporter.sendMail(mailOptions);
      return "Correo enviado con éxito";
    } catch (error) {
      //console.error("Error al enviar el correo:", error);
      throw new Error((error as Error).message);
    }
  }
}

export default new EmailService();
