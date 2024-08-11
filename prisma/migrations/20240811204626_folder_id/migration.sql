-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_fileId_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "folderId" TEXT;
