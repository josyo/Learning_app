-- Lessons removed from their module markdown are archived, never deleted:
-- hidden from learners and excluded from completion, progress kept.
-- AlterTable
ALTER TABLE "lesson" ADD COLUMN     "archivedAt" TIMESTAMP(3);
