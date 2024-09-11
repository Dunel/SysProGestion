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
  institutionId: z
    .string({ required_error: "institucion es requerida" })
    .min(1)
    .max(4)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 9999) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "instituto no valido.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(9999)),
  dateStart: z
    .string()
    .transform((val, ctx) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La fecha no es válida",
        });
        return z.NEVER;
      }
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      const dayDiff = today.getDate() - date.getDate();
      return date;
    })
    .or(
      z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      })
    ),
  dateEnd: z
    .string()
    .transform((val, ctx) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La fecha no es válida",
        });
        return z.NEVER;
      }
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      const dayDiff = today.getDate() - date.getDate();
      return date;
    })
    .or(
      z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      })
    ),
  estadoId: z
    .string()
    .min(1)
    .max(2)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números en el estado.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 24) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Estado no valido.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(24)),
  municipioId: z
    .string()
    .min(1)
    .max(3)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 462) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Municipio no valida.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(1150)),
  parroquiaId: z
    .string()
    .min(1)
    .max(4)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 1150) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parroquia no valida.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(1150)),
  careerId: z
    .string({ required_error: "La carrera es requerida" })
    .min(1)
    .max(4)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 9999) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "instituto no valido.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(9999)),
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
  institutionId: z
    .string({ required_error: "La universidad es requerida" })
    .min(1)
    .max(4)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 9999) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "instituto no valido.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(9999)),

  dateStart: z
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

  dateEnd: z
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

  estadoId: z
    .string()
    .min(1)
    .max(2)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números en el estado.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 24) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Estado no valido.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(24)),
  municipioId: z
    .string()
    .min(1)
    .max(3)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 462) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Municipio no valida.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(1150)),
  parroquiaId: z
    .string()
    .min(1)
    .max(4)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 1150) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parroquia no valida.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(1150)),
  careerId: z
    .string({ required_error: "La carrera es requerida" })
    .min(1)
    .max(4)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 9999) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "instituto no valido.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(9999)),
  interests: z
    .string({ required_error: "Los intereses son requeridos" })
    .min(10, { message: "Los intereses debe tener minimo 10 caracteres" })
    .max(100, { message: "Los intereses debe tener maximo 100 caracteres" }),
  description: z
    .string({ required_error: "La descripción es requerida" })
    .min(7, { message: "La descripción debe tener minimo 7 caracteres" })
    .max(100, { message: "La descripción debe tener maximo 100 caracteres" }),
});

export const profileDepenSchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener minimo 3 caracteres" })
    .max(50, { message: "El nombre debe tener maximo 50 caracteres" })
    .regex(nameRegex, {
      message: "El nombre no debe contener números ni signos de puntuación",
    })
    .transform((val) => val.toUpperCase()), // Validación de solo letras
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
    .optional().or(z.literal('')),
  estadoId: z
    .string()
    .min(1)
    .max(2)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números en el estado.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 24) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Estado no valido.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(24)),
  municipioId: z
    .string()
    .min(1)
    .max(3)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 462) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Municipio no valida.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(1150)),
  parroquiaId: z
    .string()
    .min(1)
    .max(4)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 1150) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parroquia no valida.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(1150)),
  address: z
    .string({ required_error: "La dirección es requerida" })
    .min(10, { message: "La dirección debe tener minimo 10 caracteres" })
    .max(100, { message: "La dirección debe tener maximo 100 caracteres" })
    .optional().or(z.literal('')),
  description: z
    .string({ required_error: "La descripción es requerida" })
    .min(7, { message: "La descripción debe tener minimo 7 caracteres" })
    .max(100, { message: "La descripción debe tener maximo 100 caracteres" })
    .optional().or(z.literal('')),
  email: z
    .string({ required_error: "El correo es requerido" })
    .email({ message: "El correo no es valido" })
    .optional().or(z.literal('')),
  social: z
    .string({ required_error: "El social es requerido" })
    .url({ message: "El social no es valido" })
    .optional().or(z.literal('')),
  rif: z
    .string({ required_error: "El rif es requerido" })
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
    .or(z.number().min(6000000).max(99999999))
    .optional(),
});

export type ProfileDepenFormData = z.infer<typeof profileDepenSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ProfileFrontFormData = z.infer<typeof profileFrontSchema>;
