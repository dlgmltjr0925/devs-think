-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('Language', 'Framework', 'Database', 'Cloud', 'Tool', 'Other');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');

-- CreateEnum
CREATE TYPE "PostAnalysisStatus" AS ENUM ('Pending', 'Completed', 'Failed', 'Skipped');

-- CreateEnum
CREATE TYPE "ProjectAnalysisStatus" AS ENUM ('Pending', 'Completed', 'Failed', 'Skipped');

-- CreateEnum
CREATE TYPE "EducationDegree" AS ENUM ('Associate', 'Bachelor', 'Master', 'Doctorate', 'Other');

-- CreateEnum
CREATE TYPE "EducationMediaType" AS ENUM ('Image', 'Document', 'Website', 'Presentation');

-- CreateEnum
CREATE TYPE "SkillReferenceSource" AS ENUM ('Post', 'Project');

-- CreateEnum
CREATE TYPE "ProjectReferenceSource" AS ENUM ('Post');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FullTime', 'Contract', 'Freelance', 'Internship', 'PartTime');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('Office', 'Remote', 'Hybrid');

-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('Certification', 'Award', 'Language', 'Volunteer', 'Publication', 'Patent', 'Conference', 'Training', 'Other');

-- CreateEnum
CREATE TYPE "LanguageLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Native');

-- CreateEnum
CREATE TYPE "ExperienceMediaType" AS ENUM ('Image', 'Document', 'Website', 'Presentation', 'Video', 'Other');

-- CreateEnum
CREATE TYPE "ResumeShareType" AS ENUM ('Public', 'Private', 'Protected');

-- CreateEnum
CREATE TYPE "PortfolioShareType" AS ENUM ('Public', 'Private', 'Protected');

-- CreateEnum
CREATE TYPE "PortfolioTheme" AS ENUM ('Classic', 'Modern', 'Minimal', 'Creative', 'Professional', 'Custom');

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "thumbnail_url" TEXT,
    "clean_url" TEXT,
    "is_public" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_drafts" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "post_drafts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_tag_relations" (
    "post_id" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "post_tag_relations_pkey" PRIMARY KEY ("post_id","tag_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_analyses" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "status" "PostAnalysisStatus" NOT NULL,
    "failed_count" INTEGER NOT NULL,
    "failed_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "post_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" "SkillCategory",
    "level" "SkillLevel",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_skill_relations" (
    "id" SERIAL NOT NULL,
    "career_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "career_skill_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_skill_relations" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "project_skill_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_references" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "source" "SkillReferenceSource" NOT NULL,
    "source_id" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "skill_references_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "role" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_ongoing" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT,
    "repository_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_analyses" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "status" "ProjectAnalysisStatus" NOT NULL,
    "failed_count" INTEGER NOT NULL,
    "failed_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "project_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_references" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "source" "ProjectReferenceSource" NOT NULL,
    "source_id" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "project_references_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "careers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "employment_type" "EmploymentType" NOT NULL,
    "location_type" "LocationType" NOT NULL,
    "location" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_current_position" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "responsibilities" TEXT,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "careers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_project_relations" (
    "id" SERIAL NOT NULL,
    "career_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "career_project_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_achievements" (
    "id" SERIAL NOT NULL,
    "career_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "metrics" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "career_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "school_name" TEXT NOT NULL,
    "degree" "EducationDegree" NOT NULL,
    "major" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "gpa" DECIMAL(3,2),
    "activities" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_skill_relations" (
    "id" SERIAL NOT NULL,
    "education_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "education_skill_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_medias" (
    "id" SERIAL NOT NULL,
    "education_id" INTEGER NOT NULL,
    "type" "EducationMediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "education_medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" "ExperienceType" NOT NULL,
    "title" TEXT NOT NULL,
    "organization" TEXT,
    "description" TEXT,
    "started_at" TIMESTAMP(3),
    "ended_at" TIMESTAMP(3),
    "is_ongoing" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification_details" (
    "id" SERIAL NOT NULL,
    "experience_id" INTEGER NOT NULL,
    "certification_number" TEXT,
    "issued_by" TEXT,
    "valid_until" TIMESTAMP(3),

    CONSTRAINT "certification_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "award_details" (
    "id" SERIAL NOT NULL,
    "experience_id" INTEGER NOT NULL,
    "rank" TEXT,
    "prize" TEXT,
    "category" TEXT,

    CONSTRAINT "award_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language_details" (
    "id" SERIAL NOT NULL,
    "experience_id" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "test_type" TEXT,
    "score" TEXT,
    "level" "LanguageLevel",

    CONSTRAINT "language_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_details" (
    "id" SERIAL NOT NULL,
    "experience_id" INTEGER NOT NULL,
    "hours" INTEGER,
    "target" TEXT,
    "location" TEXT,

    CONSTRAINT "volunteer_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_skill_relations" (
    "id" SERIAL NOT NULL,
    "experience_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "experience_skill_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_medias" (
    "id" SERIAL NOT NULL,
    "experience_id" INTEGER NOT NULL,
    "type" "ExperienceMediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "experience_medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resumes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resume_versions" (
    "id" SERIAL NOT NULL,
    "resume_id" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "snapshot" JSONB NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "resume_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resume_shares" (
    "id" SERIAL NOT NULL,
    "resume_id" INTEGER NOT NULL,
    "type" "ResumeShareType" NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "last_accessed_at" TIMESTAMP(3),

    CONSTRAINT "resume_shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "theme" "PortfolioTheme" NOT NULL DEFAULT 'Classic',
    "custom_styles" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_versions" (
    "id" SERIAL NOT NULL,
    "portfolio_id" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "snapshot" JSONB NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "portfolio_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_shares" (
    "id" SERIAL NOT NULL,
    "portfolio_id" INTEGER NOT NULL,
    "type" "PortfolioShareType" NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "last_accessed_at" TIMESTAMP(3),

    CONSTRAINT "portfolio_shares_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "certification_details_experience_id_key" ON "certification_details"("experience_id");

-- CreateIndex
CREATE UNIQUE INDEX "award_details_experience_id_key" ON "award_details"("experience_id");

-- CreateIndex
CREATE UNIQUE INDEX "language_details_experience_id_key" ON "language_details"("experience_id");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_details_experience_id_key" ON "volunteer_details"("experience_id");

-- CreateIndex
CREATE UNIQUE INDEX "resume_versions_resume_id_version_key" ON "resume_versions"("resume_id", "version");

-- CreateIndex
CREATE UNIQUE INDEX "resume_shares_token_key" ON "resume_shares"("token");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_versions_portfolio_id_version_key" ON "portfolio_versions"("portfolio_id", "version");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_shares_token_key" ON "portfolio_shares"("token");

-- AddForeignKey
ALTER TABLE "career_skill_relations" ADD CONSTRAINT "career_skill_relations_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_skill_relations" ADD CONSTRAINT "career_skill_relations_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_skill_relations" ADD CONSTRAINT "project_skill_relations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_skill_relations" ADD CONSTRAINT "project_skill_relations_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_project_relations" ADD CONSTRAINT "career_project_relations_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_project_relations" ADD CONSTRAINT "career_project_relations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_achievements" ADD CONSTRAINT "career_achievements_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_skill_relations" ADD CONSTRAINT "education_skill_relations_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "educations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_skill_relations" ADD CONSTRAINT "education_skill_relations_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_medias" ADD CONSTRAINT "education_medias_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "educations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_details" ADD CONSTRAINT "certification_details_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "award_details" ADD CONSTRAINT "award_details_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language_details" ADD CONSTRAINT "language_details_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_details" ADD CONSTRAINT "volunteer_details_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_skill_relations" ADD CONSTRAINT "experience_skill_relations_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_skill_relations" ADD CONSTRAINT "experience_skill_relations_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_medias" ADD CONSTRAINT "experience_medias_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume_versions" ADD CONSTRAINT "resume_versions_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume_shares" ADD CONSTRAINT "resume_shares_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_versions" ADD CONSTRAINT "portfolio_versions_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_shares" ADD CONSTRAINT "portfolio_shares_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
