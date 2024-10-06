import { getStudents } from "@/controllers/stats.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getStudents(req);
}