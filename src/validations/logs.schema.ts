import { z } from "zod";


export const pageSchema = z.object({
    page: z
      .string()
      .min(1)
      .max(5)
      .transform((val, ctx) => {
        const page = parseInt(val);
        if (isNaN(page) || page < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Página no válida",
          });
          return z.NEVER;
        }
        return page;
      }),
  });