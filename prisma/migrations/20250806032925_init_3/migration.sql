-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "image" TEXT,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;
