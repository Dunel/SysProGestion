import { NextRequest } from "next/server";
import { createUser } from "@/controllers/user.controller";

export async function POST(req: NextRequest) {
  return await createUser(req);
}
