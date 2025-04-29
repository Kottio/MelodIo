// const sessions = [
//   {
//     id: 1,
//     partId: 1,
//     melody: ["C", "E", "F", "G", "B"],
//     harmonizedChords: [],
//     harmonization: [],
//   },
//   {
//     id: 2,
//     partId: 2,
//     melody: ["C4", "E4", "G4"],
//     harmonizedChords: ["Cmaj"],
//     harmonization: [
//       {
//         harmony: [
//           {
//             note: "C4",
//             chord: "Dm7(9)",
//             romanNumeral: "ii7(9) in C Major",
//             commentary:
//               "The melody starts on C4, which is the 9th of a Dm7(9) chord (D-F-A-C-E). In the key of C major, the ii7 chord is a classic starting point in BossaNova harmony, providing a smooth, jazzy, and slightly colorful quality. Using Dm7(9) incorporates the 9th (E), which adds a subtle tension and richness without overpowering the melody. Voice leading is smooth because C is the minor 7th of Dm7 and naturally resolves downward or stays stable in progression, fitting the gentle flow of BossaNova. This chord sets a relaxed, sophisticated mood characteristic of the style.",
//             extensions: ["Dm11 (D-F-C-E-G)"],
//             potentialScales: ["D Dorian (D E F G A B C)"],
//           },
//           {
//             note: "E4",
//             chord: "A7(b13)",
//             romanNumeral: "V7(b13) in D minor (ii chord's V7)",
//             commentary:
//               "The E4 in the melody fits nicely as the 3rd of an A7 chord (A-C#-E-G) that acts as V7 in the key of D minor (the ii chord Dm7's V7). In BossaNova, dominant chords often include altered tensions to introduce colorful, yet tasteful dissonances. The b13 (F natural) adds a bluesy, Latin characteristic, not too harsh but flavorful. Choosing A7(b13) creates a strong pull back to Dm7 or a tonic chord, strategically supporting the smooth bass movement typical in BossaNova. Voice leading keeps E smooth as the chord tone while the chord’s altered extensions hint at subtle jazz complexity.",
//             extensions: ["A7(b9,b13)"],
//             potentialScales: [
//               "A Mixolydian b13 (A B C# D E F G)",
//               "A Altered (super-Locrian) for advanced color",
//             ],
//           },
//           {
//             note: "G4",
//             chord: "G7(13)",
//             romanNumeral: "V7(13) in C Major (V7)",
//             commentary:
//               "G4 is the root of the G7 chord, which functions as the dominant in C major. The addition of the 13th (E) enhances the color and smoothness without straying far from the chord's identity, fitting the warm, intimate tone of BossaNova. The G7(13) can resolve nicely back to Cmaj7 or a related chord, providing forward motion with tasteful sophistication. Voice leading considerations include emphasizing the dissonant yet smooth 13th and balancing the dominant tension with a soft, rhythmic pulse characteristic of BossaNova. This chord gives sense of arrival and connection in the progression.",
//             extensions: ["G13(9) (G-B-D-F-A-E)"],
//             potentialScales: [
//               "G Mixolydian (G A B C D E F)",
//               "G Lydian Dominant (G A B C# D E F) for color",
//             ],
//           },
//         ],
//         advices: [
//           {
//             advice:
//               "Explore extended chords with gentle tensions such as 9ths, 11ths, and 13ths, which add color without harshness. Practice substituting simple triads with their 7th or 9th counterparts to create smooth voice leading and maintain BossaNova’s intimate mood.",
//             example: "Dm7 - G7(13) - Cmaj7(9)",
//           },
//           {
//             advice:
//               "Focus on voice leading between chord tones, especially between the 3rds and 7ths of adjacent chords, to create a flowing, legato feel which is essential in BossaNova harmony.",
//             example: "Dm7 (F-C) → G7 (B-F) → Cmaj7 (E-B)",
//           },
//           {
//             advice:
//               "Practice the use of altered dominants and their resolutions within the ii-V-I framework common in BossaNova, introducing subtle chromaticism like b9 or b13 to add sophistication while keeping the groove relaxed.",
//             example: "Dm7 - A7(b13) - G7(13) - Cmaj7",
//           },
//         ],
//       },
//     ],
//   },
// ];

import prisma from "../prismaClient";
const sessionRepo = {
  getSession: async function (partId: number) {
    // console.log(partId);
    // return sessions.find((s) => s.partId === partId) || null;
    return await prisma.sessionsHarmony.findMany({
      where: { partId },
    });
  },

  postMelody: async function (partId: number, melody: string[]) {
    return await prisma.sessionsHarmony.create({
      data: {
        partId,
        melody,
        name: `Session of ${partId}`,
        harmonizedChords: [],
        harmonization: {},
      },
    });
    // const newSession = {
    //   id: sessions.length + 1,
    //   partId,
    //   melody,
    //   harmonizedChords: [],
    //   harmonization: [],
    // };
    // sessions.push(newSession);
    // console.log(newSession);
    // return true;
  },

  putHarmonization: async function (
    partId: number,
    harmonization: { harmony: any[]; advices: any[] },
    style: string
  ) {
    // const session = prisma.sessionsHarmony.findUnique({
    //   where: { partId },
    // });
    // if (!session) {
    //   console.error("Trying to harmonize non existing Melody");
    //   return null;
    // }

    const harmonizedChords = harmonization.harmony.map((h) => h.chord);
    return await prisma.sessionsHarmony.update({
      where: { partId },
      data: {
        harmonization,
        harmonizedChords,
        style,
      },
    });

    // const session = sessions.find((s) => s.partId == partId);
    // if (!session) {
    //   console.log("Trying to harmonize based a non existent session");
    //   return null;
    // }
    // session.harmonization.push({
    //   harmony: [...harmonization.harmony],
    //   advices: [...harmonization.advices],
    // });

    // console.log("Repository", session);
    // return true;
  },
};

export default sessionRepo;
