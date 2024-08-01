import bcrypt from "bcrypt";
import prisma from "@/db";

interface User {
  mail: string;
  cedula: number;
  password: string;
  nombre: string;
  apellido: string;
  telefono: string;
}

export async function createUser({ data }: { data: User }) {
  try {
    const userfound = await prisma.user.findFirst({
      where: {
        OR: [
          {
            cedula: data.cedula,
          },
          {
            mail: data.mail,
          },
        ],
      },
    });
    if (userfound) {
      throw new Error("Usuario ya registrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        mail: data.mail,
        cedula: data.cedula,
        password: hashedPassword,
        names: data.nombre,
        lastnames: data.apellido,
        phone: data.telefono,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw new Error((error as Error).message);
  }
}
