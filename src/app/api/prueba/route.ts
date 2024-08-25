import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        //const prueba = req.nextauth.token;
        return NextResponse.json({ message: "prueba" }, { status: 200 });
    } catch (error) {
        console.log("Error: ", (error as Error).message);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}