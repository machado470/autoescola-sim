-- CreateTable
CREATE TABLE "Simulator" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Simulator_pkey" PRIMARY KEY ("id")
);
