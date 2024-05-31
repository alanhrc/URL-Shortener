-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "url_origin" TEXT NOT NULL,
    "url_hash" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "user_id" TEXT,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
