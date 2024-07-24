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
    to: string,
    subject: string,
    text: string
  ): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text,
      };

      await this.transporter.sendMail(mailOptions);
      console.log("Correo enviado con éxito");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      throw new Error("Error al enviar el correo");
    }
  }
}

export default new EmailService();
