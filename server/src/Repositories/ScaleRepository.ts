import prisma from "../prismaClient";

export async function getScales() {
  const scales = await prisma.mode.findMany({ include: { notes: true } });
  return scales;
}
