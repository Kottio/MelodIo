// const compositions = [
//   {
//     id: 1,
//     name: "First Composition",
//     description: "My frist compistion in htis app",
//     created_at: "26/04/2025",
//     status: "In progress",
//     stared: true,
//     styles: ["Bossa Nova", "Gypsy Jazz"],
//   },
//   {
//     id: 2,
//     name: "Whereas Composition",
//     description: "My Second compistion in htis app",
//     created_at: "26/04/2025",
//     status: "In progress",
//     stared: false,
//   },
//   {
//     id: 3,
//     name: "My Bossa Nova on the Way",
//     description: "My Second compistion in htis app",
//     created_at: "26/04/2025",
//     status: "In progress",
//     stared: false,
//   },
// ];
import prisma from "../prismaClient";

const compRepo = {
  getAllCompositions: async function () {
    const compositions = await prisma.compositions.findMany();
    if (compositions) {
      console.log("Yep", compositions);
      return compositions;
    }

    // return compositions;
  },
  newComposition: async function (
    name: string,
    description: string,
    style: string
  ) {
    return await prisma.compositions.create({
      data: {
        name,
        description,
        styles: [style],
      },
    });
    // const newComposition = {
    //   id: compositions.length + 1,
    //   name,
    //   description,
    //   created_at: "madeupdate",
    //   status: "In progress",
    //   stared: false,
    //   style,
    // };
    // compositions.push(newComposition);
    // return;
  },
};

export default compRepo;
