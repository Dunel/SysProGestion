import prisma from "@/db";

export const validateCode = async (code: number, mail: string) => {
  try {
    const codeFind = await prisma.coderegister.findMany({
      where: {
        mail,
        code,
      },
    });
    if (codeFind.length === 0) {
      throw new Error("Código incorrecto");
    }

    const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
    if (
      new Date(codeFind[0].updatedAt).getTime() + FIVE_MINUTES_IN_MS <
      Date.now()
    ) {
      throw new Error("El código ha expirado");
    }

    return "Código correcto";
  } catch (error) {
    //console.error("Error:", error);
    throw new Error((error as Error).message);
  }
};
