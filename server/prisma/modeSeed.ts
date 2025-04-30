import { PrismaClient } from "../node_modules/generated/prisma";

const prisma = new PrismaClient();
const chromaticScale = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const modesData = [
  {
    name: "Ionian",
    intervals: ["W", "W", "H", "W", "W", "W", "H"],
    description: "Major scale",
    brightness: 8,
  },
  {
    name: "Dorian",
    intervals: ["W", "H", "W", "W", "W", "H", "W"],
    description: "Minor scale with a natural 6th",
    brightness: 6,
  },
  {
    name: "Phrygian",
    intervals: ["H", "W", "W", "W", "H", "W", "W"],
    description: "Minor scale with a flat 2nd",
    brightness: 4,
  },
  {
    name: "Lydian",
    intervals: ["W", "W", "W", "H", "W", "W", "H"],
    description: "Major scale with a raised 4th",
    brightness: 9,
  },
  {
    name: "Mixolydian",
    intervals: ["W", "W", "H", "W", "W", "H", "W"],
    description: "Major scale with a flat 7th",
    brightness: 7,
  },
  {
    name: "Aeolian",
    intervals: ["W", "H", "W", "W", "H", "W", "W"],
    description: "Natural minor scale",
    brightness: 5,
  },
  {
    name: "Locrian",
    intervals: ["H", "W", "W", "H", "W", "W", "W"],
    description: "Minor scale with flat 2nd and 5th",
    brightness: 2,
  },
];

function generateModeNotes(root: string, intervals: string[]): string[] {
  const steps = intervals.map((step) => (step === "W" ? 2 : 1));
  const rootIndex = chromaticScale.indexOf(root);
  const scale = [root];

  let currentIndex = rootIndex;
  for (let i = 0; i < steps.length; i++) {
    currentIndex = (currentIndex + steps[i]) % chromaticScale.length;
    scale.push(chromaticScale[currentIndex]);
  }

  return scale;
}

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.modeNote.deleteMany();
  await prisma.mode.deleteMany();

  for (const mode of modesData) {
    const createdMode = await prisma.mode.create({
      data: {
        name: mode.name,
        description: mode.description,
        intervals: mode.intervals,
        brightness: mode.brightness,
      },
    });

    for (const root of chromaticScale) {
      const scaleNotes = generateModeNotes(root, mode.intervals);

      await prisma.modeNote.create({
        data: {
          root,
          notes: scaleNotes,
          mode: {
            connect: { id: createdMode.id },
          },
        },
      });
    }

    console.log(`✅ Created mode: ${createdMode.name}`);
  }

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
