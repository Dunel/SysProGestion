import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*./=])[A-Za-z\d@#$%&*./=]{8,26}$/;

export const codeSchema = z.object({
  code: z
    .string()
    .min(6, { message: "El código es incorrecto" })
    .max(6, { message: "El código es incorrecto" })
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El código debe ser un númerico",
        });
        return z.NEVER;
      }
      if (parsed < 100000 || parsed > 999999) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El código debe ser un númerico",
        });
        return z.NEVER;
      }
      return parsed;
    }),
  mail: z
    .string({ required_error: "El correo es requerido." })
    .min(10, { message: "El correo debe tener minimo 10 caracteres." })
    .max(75, { message: "El correo debe tener maximo 75 caracteres." })
    .email({ message: "El correo no es válido" })
    .transform((val) => val.toLowerCase()),
});

export const codeIdSchema = z.object({
  idCode: z
    .string()
    .min(20, { message: "El código es incorrecto" })
    .max(36, { message: "El código es incorrecto" }),
});

export const roleSchema = z.object({
  role: z.enum(["estudiante", "alcaldia", "dependencia"]),
});

export const emailRecoverySchema = z.object({
  email: z
    .string({ required_error: "Email es quererido" })
    .min(10, { message: "El correo debe tener minimo 10 caracteres." })
    .max(75, { message: "El correo debe tener maximo 75 caracteres." })
    .email({ message: "El correo no es válido" })
    .transform((val) => val.toLowerCase()),
});

export const recoveryCodeSchema = z.object({
  id: z
    .string({ required_error: "El id es requerido" })
    .cuid2({ message: "El id es incorrecto" }),
  code: z
    .string({ required_error: "El código es requerido" })
    .min(9, { message: "El código es incorrecto" })
    .max(9, { message: "El código es incorrecto" })
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El código es incorrecto",
        });
        return z.NEVER;
      }
      if (parsed < 100000000 || parsed > 999999999) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El código es incorrecto",
        });
        return z.NEVER;
      }
      return parsed;
    }).or(z.number().min(100000000).max(999999999)),
});

export const recoveryPasswordSchema = z.object({
    password: z
      .string({ required_error: "La contraseña es requerida" })
      .min(8, { message: "La contraseña debe tener mínimo 8 caracteres" })
      .max(26, { message: "La contraseña debe tener máximo 26 caracteres" })
      .regex(passwordRegex, {
        message:
          "La contraseña debe contener al menos una letra mayúscula, un dígito y uno de los siguientes caracteres especiales: @, #, $, %, &, *, ., /, =",
      }),
    passwordConfirmation: z.string(),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirmation"],
  });

export type emailFormRecovery = z.infer<typeof emailRecoverySchema>;
export type recoveryPasswordForm = z.infer<typeof recoveryPasswordSchema>;
export type recoveryCodeForm = z.infer<typeof recoveryCodeSchema>;
