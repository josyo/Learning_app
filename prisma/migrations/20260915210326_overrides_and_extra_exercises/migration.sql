-- CreateEnum
CREATE TYPE "MentorAssignmentStatus" AS ENUM ('ASSIGNED', 'SUBMITTED', 'APPROVED', 'CHANGES_REQUESTED');

-- CreateTable
CREATE TABLE "mentor_assignment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "status" "MentorAssignmentStatus" NOT NULL DEFAULT 'ASSIGNED',
    "submissionContent" TEXT,
    "submissionGithubUrl" TEXT,
    "submissionDeployedUrl" TEXT,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentor_assignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mentor_assignment" ADD CONSTRAINT "mentor_assignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_assignment" ADD CONSTRAINT "mentor_assignment_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
