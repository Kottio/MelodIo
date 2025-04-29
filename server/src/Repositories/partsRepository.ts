// const parts = [
//   {
//     id: 1, //Needs to be unique
//     composition_id: 1,
//     name: "First Part",
//     type: "Melody",
//     created_at: "26/04/2025",
//     styles: "Bossa Nova",
//   },
//   {
//     id: 2,
//     name: "First Composition",
//     composition_id: 1,
//     type: "Melody",
//     created_at: "26/04/2025",
//   },
//   {
//     id: 3,
//     name: "First Composition",
//     composition_id: 2,
//     type: "Melody",
//     created_at: "26/04/2025",
//   },
// ];

import prisma from "../prismaClient";

const partRepo = {
  getParts: async function (compositionId: string) {
    // const part = parts.filter((part) => {
    //   return part.composition_id === +compositionId;
    // });
    // return part;
    return await prisma.parts.findMany({
      where: { composition_id: +compositionId },
      include: { session: true },
    });
  },

  postPart: async function (name: string, type: string, compositionId: string) {
    return await prisma.parts.create({
      data: {
        name,
        type,
        composition_id: +compositionId,
        styles: [],
        melody: [],
      },
    });
    // const newPart = {
    //   id: parts.length + 1,
    //   name,
    //   composition_id: +compositionId,
    //   type,
    //   created_at: "xx/ee/fgf",
    // };
    // parts.push(newPart);
    // return true;
  },
};
export default partRepo;
