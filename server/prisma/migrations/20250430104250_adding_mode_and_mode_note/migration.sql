-- CreateTable
CREATE TABLE "Mode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "intervals" TEXT[],
    "brightness" INTEGER NOT NULL,

    CONSTRAINT "Mode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModeNote" (
    "id" SERIAL NOT NULL,
    "modeId" INTEGER NOT NULL,
    "root" TEXT NOT NULL,
    "notes" TEXT[],

    CONSTRAINT "ModeNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mode_name_key" ON "Mode"("name");

-- AddForeignKey
ALTER TABLE "ModeNote" ADD CONSTRAINT "ModeNote_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "Mode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
