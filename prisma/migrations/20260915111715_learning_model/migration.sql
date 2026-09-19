-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED');

-- CreateTable
CREATE TABLE "learning_path" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning_path_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "path_module" (
    "id" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "path_module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_prerequisite" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "requiredModuleId" TEXT NOT NULL,

    CONSTRAINT "module_prerequisite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "mentorId" TEXT,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "learning_path_slug_key" ON "learning_path"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "module_slug_key" ON "module"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "path_module_pathId_moduleId_key" ON "path_module"("pathId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "path_module_pathId_order_key" ON "path_module"("pathId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "module_prerequisite_moduleId_requiredModuleId_key" ON "module_prerequisite"("moduleId", "requiredModuleId");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_userId_pathId_key" ON "enrollment"("userId", "pathId");

-- AddForeignKey
ALTER TABLE "path_module" ADD CONSTRAINT "path_module_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "learning_path"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "path_module" ADD CONSTRAINT "path_module_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_prerequisite" ADD CONSTRAINT "module_prerequisite_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_prerequisite" ADD CONSTRAINT "module_prerequisite_requiredModuleId_fkey" FOREIGN KEY ("requiredModuleId") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "learning_path"("id") ON DELETE CASCADE ON UPDATE CASCADE;
