import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const main = async () => {
//   await prisma.$connect()
//   // hold connection during application duration
// }

// main()
//   .then(() => {
//     // garbage collection
//   });

export default prisma;
