import { NextRequest } from "next/server";
import { uploadPdf } from "@/controllers/file.controller";

export async function POST(req: NextRequest) {
  return uploadPdf(req);
}
