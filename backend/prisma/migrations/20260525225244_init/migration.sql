-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('VISITA_GUIADA', 'TALLER', 'ENCUENTRO', 'EVENTO_RECURRENTE');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('CAMISAS', 'TOTEBAGS', 'TAZAS', 'LIBROS', 'PRINTS', 'ACCESORIOS');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL,
    "recurrence" TEXT,
    "price" INTEGER NOT NULL DEFAULT 10000,
    "capacity" INTEGER,
    "image_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "day_order" INTEGER NOT NULL,
    "open_time" TEXT NOT NULL,
    "close_time" TEXT NOT NULL,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "base_price" INTEGER NOT NULL DEFAULT 10000,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "category" "ProductCategory" NOT NULL,
    "image_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "original_url" TEXT NOT NULL,
    "generated_url" TEXT,
    "artwork_name" TEXT,
    "author_name" TEXT,
    "author_age" INTEGER,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
