import { NextRequest } from "next/server";
import { uploadImage, uploadTest } from "@/controllers/file.controller";

export async function POST(req: NextRequest) {
  return uploadTest(req);
}
