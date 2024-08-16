import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "inage/jpg"];

export const imageFileSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, "El tamaño de la imagen excede 1MB")
  .refine((file) => {
    return !file || ACCEPTED_IMAGE_TYPES.includes(file.type);
  }, "La imagen debe ser de tipo PNG o JPEG");
