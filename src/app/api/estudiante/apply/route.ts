import { apply, getApplication } from "@/controllers/application.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await apply(req);
}

export async function GET(req: NextRequest) {
  return await getApplication(req);
}