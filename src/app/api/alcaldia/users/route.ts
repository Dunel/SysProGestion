import { createUserAlcaldia, deleteUser, getUser, updateUser } from "@/controllers/user.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getUser(req);
}

export async function PUT(req: NextRequest){
  return await updateUser(req);
}

export async function POST(req: NextRequest){
  return await createUserAlcaldia(req);
}

export async function DELETE(req: NextRequest){
  return await deleteUser(req);
}