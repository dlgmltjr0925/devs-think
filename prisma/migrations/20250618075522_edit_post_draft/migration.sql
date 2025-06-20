/*
  Warnings:

  - The primary key for the `post_tag_relations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `user_id` to the `post_drafts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `post_id` on the `post_tag_relations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "post_drafts" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "post_tag_relations" DROP CONSTRAINT "post_tag_relations_pkey",
DROP COLUMN "post_id",
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD CONSTRAINT "post_tag_relations_pkey" PRIMARY KEY ("post_id", "tag_id");

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "draft_title" TEXT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tag_relations" ADD CONSTRAINT "post_tag_relations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tag_relations" ADD CONSTRAINT "post_tag_relations_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_drafts" ADD CONSTRAINT "post_drafts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_drafts" ADD CONSTRAINT "post_drafts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
