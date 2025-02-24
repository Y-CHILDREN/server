/*
  Warnings:

  - The primary key for the `TripScheduleUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id,tripSchedule_id]` on the table `TripScheduleUser` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `TripScheduleUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "TripScheduleUser" DROP CONSTRAINT "TripScheduleUser_tripSchedule_id_fkey";

-- DropForeignKey
ALTER TABLE "TripScheduleUser" DROP CONSTRAINT "TripScheduleUser_user_id_fkey";

-- AlterTable
ALTER TABLE "TripScheduleUser" DROP CONSTRAINT "TripScheduleUser_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TripScheduleUser_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "TripScheduleUser_user_id_tripSchedule_id_key" ON "TripScheduleUser"("user_id", "tripSchedule_id");

-- AddForeignKey
ALTER TABLE "TripScheduleUser" ADD CONSTRAINT "TripScheduleUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripScheduleUser" ADD CONSTRAINT "TripScheduleUser_tripSchedule_id_fkey" FOREIGN KEY ("tripSchedule_id") REFERENCES "TripSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
