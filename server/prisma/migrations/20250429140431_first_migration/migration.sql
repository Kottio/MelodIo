-- CreateTable
CREATE TABLE "Compositions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "styles" TEXT[],

    CONSTRAINT "Compositions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parts" (
    "id" SERIAL NOT NULL,
    "composition_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "type" TEXT NOT NULL,
    "styles" TEXT[],
    "melody" TEXT[],

    CONSTRAINT "Parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionsHarmony" (
    "id" SERIAL NOT NULL,
    "partId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "melody" TEXT[],
    "harmonizedChords" TEXT[],
    "harmonization" JSONB NOT NULL,

    CONSTRAINT "SessionsHarmony_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionsHarmony_partId_key" ON "SessionsHarmony"("partId");

-- AddForeignKey
ALTER TABLE "Parts" ADD CONSTRAINT "Parts_composition_id_fkey" FOREIGN KEY ("composition_id") REFERENCES "Compositions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionsHarmony" ADD CONSTRAINT "SessionsHarmony_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
