-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "dateBirth" TIMESTAMP(3) NOT NULL,
    "size" TEXT NOT NULL,
    "adoptionStatus" BOOLEAN NOT NULL,
    "photos" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pets_userId_key" ON "pets"("userId");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
