/*
  Warnings:

  - You are about to drop the column `tripEventId` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the column `tripScheduleId` on the `TripEvent` table. All the data in the column will be lost.
  - The primary key for the `TripScheduleUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tripScheduleId` on the `TripScheduleUser` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TripScheduleUser` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `tripEvent_id` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripSchedule_id` to the `TripEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripSchedule_id` to the `TripScheduleUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `TripScheduleUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cost" DROP CONSTRAINT "Cost_tripEventId_fkey";

-- DropForeignKey
ALTER TABLE "TripEvent" DROP CONSTRAINT "TripEvent_tripScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "TripScheduleUser" DROP CONSTRAINT "TripScheduleUser_tripScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "TripScheduleUser" DROP CONSTRAINT "TripScheduleUser_userId_fkey";

-- AlterTable
ALTER TABLE "Cost" DROP COLUMN "tripEventId",
ADD COLUMN     "tripEvent_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TripEvent" DROP COLUMN "tripScheduleId",
ADD COLUMN     "tripSchedule_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TripScheduleUser" DROP CONSTRAINT "TripScheduleUser_pkey",
DROP COLUMN "tripScheduleId",
DROP COLUMN "userId",
ADD COLUMN     "tripSchedule_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "TripScheduleUser_pkey" PRIMARY KEY ("user_id", "tripSchedule_id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "TripScheduleUser" ADD CONSTRAINT "TripScheduleUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripScheduleUser" ADD CONSTRAINT "TripScheduleUser_tripSchedule_id_fkey" FOREIGN KEY ("tripSchedule_id") REFERENCES "TripSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripEvent" ADD CONSTRAINT "TripEvent_tripSchedule_id_fkey" FOREIGN KEY ("tripSchedule_id") REFERENCES "TripSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cost" ADD CONSTRAINT "Cost_tripEvent_id_fkey" FOREIGN KEY ("tripEvent_id") REFERENCES "TripEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
