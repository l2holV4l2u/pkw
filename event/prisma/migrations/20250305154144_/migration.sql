/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - Made the column `endDate` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Form_eventId_key" ON "Form"("eventId");
