import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*./=])[A-Za-z\d@#$%&*./=]{8,26}$/;

// Expresiones regulares para validar los campos
const nameRegex = /^[A-Za-zÀ-ÿ\s' -]+$/; // Solo letras (incluyendo caracteres acentuados), espacios, apostrofe y guiones
const numericRegex = /^\d+$/; // Solo números

//validacionbackend no tocar plox
export const userSchema = z.object({
  cedula: z
    .string({ required_error: "La cedula es requerida" })
    .min(7, { message: "La cedula debe tener minimo 7 caracteres" })
    .max(8, { message: "La cedula debe tener maximo 8 caracteres" })
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Los caracteres deben ser un númericos",
        });
        return z.NEVER;
      }
      if (parsed < 6000000 || parsed > 99999999) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Número de cedula no valido",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(6000000).max(999999999)),
  nombre: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener minimo 3 caracteres" })
    .max(50, { message: "El nombre debe tener maximo 50 caracteres" })
    .regex(nameRegex, {
      message: "El nombre no debe contener números ni signos de puntuación",
    })
    .transform((val) => val.toUpperCase()),
  apellido: z
    .string({ required_error: "El apellido es requerido" })
    .min(3, { message: "El apellido debe tener minimo 3 caracteres" })
    .max(50, { message: "El apellido debe tener maximo 50 caracteres" })
    .regex(nameRegex, {
      message: "El apellido no debe contener números ni signos de puntuación",
    })
    .transform((val) => val.toUpperCase()),
  // Validación de solo letras
  birthdate: z
    .string({ required_error: "La fecha de nacimiento es requerida" })
    .datetime({ offset: true })
    .transform((val, ctx) => {
      const datePart = val.split("T")[0];
      const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(datePart);
      if (!isValidFormat) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Formato de fecha no válido. Usa el formato YYYY-MM-DD",
        });
        return z.NEVER;
      }
      const date = new Date(`${datePart}T00:00:00-04:00`);

      if (isNaN(date.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La fecha no es válida",
        });
        return z.NEVER;
      }

      return date;
    }),
  telefono: z
    .string({ required_error: "El telefono es requerido" })
    .min(10, { message: "El telefono debe tener minimo 10 caracteres" })
    .max(12, { message: "El telefono debe tener maximo 10 caracteres" }),
  password: z
    .string({ required_error: "La contraseña es requerida." })
    .min(8, { message: "La contraseña debe tener minimo 8 caracteres." })
    .max(26, { message: "La contraseña debe tener maximo 26 caracteres." })
    .regex(passwordRegex, {
      message:
        "La contraseña debe contener al menos una letra mayúscula, un dígito y uno de los siguientes caracteres especiales: @, #, $, %, &, *, ., /, =,.",
    }),
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
}); /// no tocar plix

export const userFormSchema = z
  .object({
    cedula: z
      .string({ required_error: "La cédula es requerida" })
      .min(7, { message: "La cédula debe tener mínimo 7 caracteres" })
      .max(8, { message: "La cédula debe tener máximo 8 caracteres" })
      .regex(numericRegex, { message: "La cédula debe contener solo números" }), // Validación de solo números

    nombre: z
      .string({ required_error: "El nombre es requerido" })
      .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
      .max(50, { message: "El nombre debe tener máximo 50 caracteres" })
      .regex(nameRegex, {
        message: "El nombre no debe contener números ni signos de puntuación",
      }), // Validación de solo letras

    apellido: z
      .string({ required_error: "El apellido es requerido" })
      .min(3, { message: "El apellido debe tener mínimo 3 caracteres" })
      .max(50, { message: "El apellido debe tener máximo 50 caracteres" })
      .regex(nameRegex, {
        message: "El apellido no debe contener números ni signos de puntuación",
      }), // Validación de solo letras

    telefono: z
      .string({ required_error: "El teléfono es requerido" })
      .min(10, { message: "El teléfono debe tener mínimo 10 caracteres" })
      .max(12, { message: "El teléfono debe tener máximo 12 caracteres" })
      .regex(numericRegex, {
        message: "El teléfono debe contener solo números",
      }), // Validación de solo números

    birthdate: z
      .string({ required_error: "La fecha de nacimiento es requerida" })
      .refine(
        (val) => {
          const regex = /^\d{4}-\d{2}-\d{2}$/; // Validación para el formato "yyyy-mm-dd"
          return regex.test(val);
        },
        {
          message: "El formato de la fecha es incorrecto. Debe ser yyyy-mm-dd",
        }
      )
      .transform((val, ctx) => {
        const [year, month, day] = val.split("-").map(Number); // Separar año, mes y día
        const date = new Date(year, month - 1, day); // Crear el objeto Date con los valores extraídos

        if (
          isNaN(date.getTime()) ||
          date.getDate() !== day ||
          date.getMonth() !== month - 1 ||
          date.getFullYear() !== year
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "La fecha de nacimiento no es válida",
          });
          return z.NEVER;
        }

        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        const dayDiff = today.getDate() - date.getDate();

        return date;
      }),

    password: z
      .string({ required_error: "La contraseña es requerida" })
      .min(8, { message: "La contraseña debe tener mínimo 8 caracteres" })
      .max(26, { message: "La contraseña debe tener máximo 26 caracteres" })
      .regex(passwordRegex, {
        message:
          "La contraseña debe contener al menos una letra mayúscula, un dígito y uno de los siguientes caracteres especiales: @, #, $, %, &, *, ., /, =",
      }),

    confirmPassword: z.string({
      required_error: "La confirmación de contraseña es requerida.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
