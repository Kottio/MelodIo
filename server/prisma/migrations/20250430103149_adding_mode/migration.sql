-- CreateTable
CREATE TABLE "Mode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "intervals" TEXT[],

    CONSTRAINT "Mode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModeNote" (
    "id" SERIAL NOT NULL,
    "modeId" INTEGER NOT NULL,
    "root" TEXT NOT NULL,
    "notes" TEXT[],

    CONSTRAINT "ModeNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ModeMoods" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ModeMoods_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mode_name_key" ON "Mode"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mood_name_key" ON "Mood"("name");

-- CreateIndex
CREATE INDEX "_ModeMoods_B_index" ON "_ModeMoods"("B");

-- AddForeignKey
ALTER TABLE "ModeNote" ADD CONSTRAINT "ModeNote_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "Mode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModeMoods" ADD CONSTRAINT "_ModeMoods_A_fkey" FOREIGN KEY ("A") REFERENCES "Mode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModeMoods" ADD CONSTRAINT "_ModeMoods_B_fkey" FOREIGN KEY ("B") REFERENCES "Mood"("id") ON DELETE CASCADE ON UPDATE CASCADE;
