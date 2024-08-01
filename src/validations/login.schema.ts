import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*./=\\])[A-Za-z\d@#$%&*./=\\]+$/;

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "El correo es requerido." })
    .min(10, { message: "Correo o contraseña incorrecta" })
    .max(75, { message: "Correo o contraseña incorrecta" })
    .email({ message: "El correo no es valido." }),
  password: z
    .string({ required_error: "La contraseña es requerida." })
    .min(8, { message: "Correo o contraseña incorrecta" })
    .max(26, { message: "Correo o contraseña incorrecta" })
    .regex(passwordRegex, {
      message:
        "Correo o contraseña incorrecta",
    }),
});
