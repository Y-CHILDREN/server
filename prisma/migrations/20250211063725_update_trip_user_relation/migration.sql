/*
  Warnings:

  - You are about to drop the column `eventId` on the `Cost` table. All the data in the column will be lost.
  - The primary key for the `TripEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_id` on the `TripEvent` table. All the data in the column will be lost.
  - You are about to drop the column `trip_id` on the `TripEvent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TripEvent` table. All the data in the column will be lost.
  - You are about to drop the column `members` on the `TripSchedule` table. All the data in the column will be lost.
  - You are about to drop the `_UserTripSchedules` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tripEventId` to the `Cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripScheduleId` to the `TripEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cost" DROP CONSTRAINT "Cost_eventId_fkey";

-- DropForeignKey
ALTER TABLE "_UserTripSchedules" DROP CONSTRAINT "_UserTripSchedules_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTripSchedules" DROP CONSTRAINT "_UserTripSchedules_B_fkey";

-- AlterTable
ALTER TABLE "Cost" DROP COLUMN "eventId",
ADD COLUMN     "tripEventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TripEvent" DROP CONSTRAINT "TripEvent_pkey",
DROP COLUMN "event_id",
DROP COLUMN "trip_id",
DROP COLUMN "userId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "tripScheduleId" INTEGER NOT NULL,
ADD CONSTRAINT "TripEvent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TripSchedule" DROP COLUMN "members";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_UserTripSchedules";

-- CreateTable
CREATE TABLE "TripScheduleUser" (
    "userId" TEXT NOT NULL,
    "tripScheduleId" INTEGER NOT NULL,

    CONSTRAINT "TripScheduleUser_pkey" PRIMARY KEY ("userId","tripScheduleId")
);

-- AddForeignKey
ALTER TABLE "TripScheduleUser" ADD CONSTRAINT "TripScheduleUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripScheduleUser" ADD CONSTRAINT "TripScheduleUser_tripScheduleId_fkey" FOREIGN KEY ("tripScheduleId") REFERENCES "TripSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripEvent" ADD CONSTRAINT "TripEvent_tripScheduleId_fkey" FOREIGN KEY ("tripScheduleId") REFERENCES "TripSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cost" ADD CONSTRAINT "Cost_tripEventId_fkey" FOREIGN KEY ("tripEventId") REFERENCES "TripEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
