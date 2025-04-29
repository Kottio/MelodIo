import { PrismaClient } from "../node_modules/generated/prisma";

const prisma = new PrismaClient();

export default prisma;

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };
// export const prisma = globalForPrisma ?? new PrismaClient();
