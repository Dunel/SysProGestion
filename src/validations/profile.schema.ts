import { z } from "zod";
// Expresiones regulares para validar los campos
const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/; // Solo letras y espacios (incluyendo caracteres acentuados)
const numericRegex = /^\d+$/; // Solo números

export const profileSchema = z.object({
  names: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener minimo 3 caracteres" })
    .max(50, { message: "El nombre debe tener maximo 50 caracteres" })
    .transform((val) => val.toUpperCase()),
  lastnames: z
    .string({ required_error: "El apellido es requerido" })
    .min(3, { message: "El apellido debe tener minimo 3 caracteres" })
    .max(50, { message: "El apellido debe tener maximo 50 caracteres" })
    .transform((val) => val.toUpperCase()),
  phone: z
    .string({ required_error: "El telefono es requerido" })
    .min(10, { message: "El telefono debe tener minimo 10 caracteres" })
    .max(12, { message: "El telefono debe tener maximo 12 caracteres" }),
  address: z
    .string({ required_error: "La dirección es requerida" })
    .min(10, { message: "La dirección debe tener minimo 10 caracteres" })
    .max(100, { message: "La dirección debe tener maximo 100 caracteres" }),
  university: z
    .string({ required_error: "La universidad es requerida" })
    .min(4, { message: "La universidad debe tener minimo 4 caracteres" })
    .max(50, { message: "La universidad debe tener maximo 50 caracteres" }),
  career: z
    .string({ required_error: "La carrera es requerida" })
    .min(4, { message: "La carrera debe tener minimo 4 caracteres" })
    .max(50, { message: "La carrera debe tener maximo 50 caracteres" }),
  quarter: z
    .string({ required_error: "El trimestre es requerido" })
    .min(1, { message: "El trimestre debe tener minimo 1 caracteres" })
    .max(2, { message: "El trimestre debe tener maximo 2 caracteres" })
    .transform((val, ctx) => {
      const trimestre = parseInt(val);
      if (isNaN(trimestre)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Los caracteres deben ser un númericos",
        });
        return z.NEVER;
      }
      if (trimestre < 1 || trimestre > 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Trimestre no valido",
        });
        return z.NEVER;
      }
      return trimestre;
    })
    .or(
      z
        .number()
        .min(1, { message: "El trimestre debe ser mayor a 0" })
        .max(12, { message: "El trimestre debe ser menor a 13" })
    ),
  skills: z
    .array(
      z.enum(
        [
          "resoluciondeproblemas",
          "trabajoenequipo",
          "adaptabilidad",
          "comunicacionefectiva",
          "liderazgo",
          "pensamientocritico",
          "orientacionaresultados",
          "creatividad",
          "gestiondeltiempo",
          "aprendizajecontinuo",
          "dondegente",
          "ensenanza",
          "sociable",
          "salud",
          "deportes",
          "logistica",
          "expresionesartisticas",
          "diseno",
          "musica",
          "ingles",
          "otrosidiomasnaturales",
          "lenguajesdeprogramacion",
        ],
        {
          errorMap: (issue, ctx) => {
            return { message: "Habilidad no valida" };
          },
        }
      )
    )
    .min(1, { message: "Debe seleccionar al menos una habilidad" }),
  interests: z
    .string({ required_error: "Los intereses son requeridos" })
    .min(10, { message: "Los intereses debe tener minimo 10 caracteres" })
    .max(100, { message: "Los intereses debe tener maximo 100 caracteres" }),
  description: z
    .string({ required_error: "La descripción es requerida" })
    .min(7, { message: "La descripción debe tener minimo 7 caracteres" })
    .max(100, { message: "La descripción debe tener maximo 100 caracteres" }),
});

export const profileFrontSchema = z.object({
  names: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener minimo 3 caracteres" })
    .max(50, { message: "El nombre debe tener maximo 50 caracteres" })
    .transform((val) => val.toUpperCase()),
  lastnames: z
    .string({ required_error: "El apellido es requerido" })
    .min(3, { message: "El apellido debe tener minimo 3 caracteres" })
    .max(50, { message: "El apellido debe tener maximo 50 caracteres" })
    .transform((val) => val.toUpperCase()),
  phone: z
    .string({ required_error: "El telefono es requerido" })
    .min(10, { message: "El telefono debe tener minimo 10 caracteres" })
    .max(12, { message: "El telefono debe tener maximo 12 caracteres" }),
  address: z
    .string({ required_error: "La dirección es requerida" })
    .min(10, { message: "La dirección debe tener minimo 10 caracteres" })
    .max(100, { message: "La dirección debe tener maximo 100 caracteres" }),
  university: z
    .string({ required_error: "La universidad es requerida" })
    .min(4, { message: "La universidad debe tener minimo 4 caracteres" })
    .max(50, { message: "La universidad debe tener maximo 50 caracteres" }),
  career: z
    .string({ required_error: "La carrera es requerida" })
    .min(4, { message: "La carrera debe tener minimo 4 caracteres" })
    .max(50, { message: "La carrera debe tener maximo 50 caracteres" }),
  quarter: z
    .string({ required_error: "El trimestre es requerido" })
    .min(1, { message: "El trimestre debe tener minimo 1 caracteres" })
    .max(2, { message: "El trimestre debe tener maximo 2 caracteres" })
    .transform((val, ctx) => {
      const trimestre = parseInt(val);
      if (isNaN(trimestre)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Los caracteres deben ser un númericos",
        });
        return z.NEVER;
      }
      if (trimestre < 1 || trimestre > 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Trimestre no valido",
        });
        return z.NEVER;
      }
      return trimestre;
    })
    .or(
      z
        .number()
        .min(1, { message: "El trimestre debe ser mayor a 0" })
        .max(12, { message: "El trimestre debe ser menor a 13" })
    ),
  interests: z
    .string({ required_error: "Los intereses son requeridos" })
    .min(10, { message: "Los intereses debe tener minimo 10 caracteres" })
    .max(100, { message: "Los intereses debe tener maximo 100 caracteres" }),
  description: z
    .string({ required_error: "La descripción es requerida" })
    .min(7, { message: "La descripción debe tener minimo 7 caracteres" })
    .max(100, { message: "La descripción debe tener maximo 100 caracteres" }),
});

// aqui
export const profileDepenSchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener minimo 3 caracteres" })
    .max(50, { message: "El nombre debe tener maximo 50 caracteres" })
    .regex(nameRegex, {
      message: "El nombre no debe contener números ni signos de puntuación",
    })
    .transform((val) => val.toUpperCase())
    , // Validación de solo letras

  names: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener minimo 3 caracteres" })
    .max(50, { message: "El nombre debe tener maximo 50 caracteres" })
    .regex(nameRegex, {
      message: "El nombre no debe contener números ni signos de puntuación",
    })
    .transform((val) => val.toUpperCase()),
  lastnames: z
    .string({ required_error: "El apellido es requerido" })
    .min(3, { message: "El apellido debe tener minimo 3 caracteres" })
    .max(50, { message: "El apellido debe tener maximo 50 caracteres" })
    .regex(nameRegex, {
      message: "El nombre no debe contener números ni signos de puntuación",
    })
    .transform((val) => val.toUpperCase()),
  phone: z
    .string({ required_error: "El telefono es requerido" })
    .min(10, { message: "El telefono debe tener minimo 10 caracteres" })
    .max(12, { message: "El telefono debe tener maximo 12 caracteres" })
    .optional(),
  address: z
    .string({ required_error: "La dirección es requerida" })
    .min(10, { message: "La dirección debe tener minimo 10 caracteres" })
    .max(100, { message: "La dirección debe tener maximo 100 caracteres" })
    .optional(),
  description: z
    .string({ required_error: "La descripción es requerida" })
    .min(7, { message: "La descripción debe tener minimo 7 caracteres" })
    .max(100, { message: "La descripción debe tener maximo 100 caracteres" })
    .optional(),
  email: z
    .string({ required_error: "El correo es requerido" })
    .email({ message: "El correo no es valido" })
    .optional(),
  social: z
    .string({ required_error: "El social es requerido" })
    .url({ message: "El social no es valido" })
    .optional(),
  rif: z
    .string({ required_error: "El rif es requerido" })
    .min(8, { message: "El rif debe tener minimo 8 caracteres" })
    .max(10, { message: "El rif debe tener maximo 10 caracteres" })
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
          message: "Número de rif no valido",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(
      z
        .number()
        .min(6000000)
        .max(99999999)
    )
    .optional(),
});

export type ProfileDepenFormData = z.infer<typeof profileDepenSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ProfileFrontFormData = z.infer<typeof profileFrontSchema>;
