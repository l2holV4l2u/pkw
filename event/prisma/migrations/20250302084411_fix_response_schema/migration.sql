/*
  Warnings:

  - You are about to drop the column `created_at` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `registration_deadline` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_id` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `contact_no` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `FormQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormQuestionField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormResponse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormResponseField` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FormQuestion" DROP CONSTRAINT "FormQuestion_event_id_fkey";

-- DropForeignKey
ALTER TABLE "FormQuestionField" DROP CONSTRAINT "FormQuestionField_formQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "FormResponse" DROP CONSTRAINT "FormResponse_event_id_fkey";

-- DropForeignKey
ALTER TABLE "FormResponse" DROP CONSTRAINT "FormResponse_formQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "FormResponse" DROP CONSTRAINT "FormResponse_submitted_by_fkey";

-- DropForeignKey
ALTER TABLE "FormResponseField" DROP CONSTRAINT "FormResponseField_formResponseId_fkey";

-- DropForeignKey
ALTER TABLE "FormResponseField" DROP CONSTRAINT "FormResponseField_form_question_field_id_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_user_id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "created_at",
DROP COLUMN "end_date",
DROP COLUMN "registration_deadline",
DROP COLUMN "start_date",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "registrationDeadline" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "event_id",
DROP COLUMN "user_id",
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("userId", "eventId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "contact_no",
DROP COLUMN "full_name",
DROP COLUMN "profile_picture",
DROP COLUMN "updated_at",
ADD COLUMN     "contactNo" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "FormQuestion";

-- DropTable
DROP TABLE "FormQuestionField";

-- DropTable
DROP TABLE "FormResponse";

-- DropTable
DROP TABLE "FormResponseField";

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "fieldOrder" INTEGER[],

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormField" (
    "id" SERIAL NOT NULL,
    "value" JSONB NOT NULL,
    "formId" INTEGER,

    CONSTRAINT "FormField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "submittedBy" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formId" INTEGER,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponseField" (
    "id" SERIAL NOT NULL,
    "formFieldId" INTEGER NOT NULL,
    "responseId" INTEGER,
    "value" JSONB NOT NULL,

    CONSTRAINT "ResponseField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormField" ADD CONSTRAINT "FormField_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseField" ADD CONSTRAINT "ResponseField_formFieldId_fkey" FOREIGN KEY ("formFieldId") REFERENCES "FormField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseField" ADD CONSTRAINT "ResponseField_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE SET NULL ON UPDATE CASCADE;
