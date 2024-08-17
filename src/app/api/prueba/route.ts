import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
       /* const prueba = await prisma.application.create({
            data: {
                userCedula: 23444536,
                title: "test3",
                description: "test3",
                location: "Calle Wallaby 42, Sidney",
                status: "active",
                
            },
        })*/
        return NextResponse.json({ message: "prueba" }, { status: 200 });
    } catch (error) {
        console.log("Error: ", (error as Error).message);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}