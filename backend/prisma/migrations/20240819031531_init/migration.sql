/*
  Warnings:

  - Added the required column `subtitle` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicProfileImage` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "subtitle" TEXT NOT NULL,
ADD COLUMN     "topicProfileImage" TEXT NOT NULL,
ADD COLUMN     "topicTags" TEXT[];
