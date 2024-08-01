import { NextRequest } from "next/server";
import { Login } from "@/controllers/login.controller";

export async function POST(req: NextRequest) {
  return await Login(req);
}
