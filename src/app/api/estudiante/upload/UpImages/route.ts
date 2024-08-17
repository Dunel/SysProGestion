import { NextRequest } from "next/server";
import { uploadImage } from "@/controllers/file.controller";

export async function POST(req: NextRequest) {
  return uploadImage(req);
}
