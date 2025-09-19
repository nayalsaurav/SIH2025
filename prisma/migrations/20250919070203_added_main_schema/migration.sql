/*
  Warnings:

  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('FARMER', 'COLLECTOR', 'LAB', 'MANUFACTURER');

-- CreateEnum
CREATE TYPE "public"."BatchStatus" AS ENUM ('ACTIVE', 'REJECTED', 'RECALLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('COLLECTION', 'QUALITY_TEST', 'FORMULATION');

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "mspId" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "public"."Role" NOT NULL;

-- CreateTable
CREATE TABLE "public"."Batch" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "qrToken" TEXT NOT NULL,
    "status" "public"."BatchStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "eventType" "public"."EventType" NOT NULL,
    "batchId" TEXT,
    "userId" TEXT NOT NULL,
    "payloadUrl" TEXT,
    "payloadHash" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "txId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ConsumerScan" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device" TEXT,
    "location" JSONB,

    CONSTRAINT "ConsumerScan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Batch_qrToken_key" ON "public"."Batch"("qrToken");

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "public"."Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ConsumerScan" ADD CONSTRAINT "ConsumerScan_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "public"."Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
