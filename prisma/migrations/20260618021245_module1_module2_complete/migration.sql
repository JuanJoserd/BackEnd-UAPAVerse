/*
  Warnings:

  - A unique constraint covering the columns `[name_categoria]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_rol]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_usuario` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "carrera_asociada" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "demo_url" TEXT,
ADD COLUMN     "estado_desarrollo" TEXT,
ADD COLUMN     "id_usuario" INTEGER NOT NULL,
ADD COLUMN     "informacion_comercial" TEXT,
ADD COLUMN     "informacion_tecnica" TEXT,
ADD COLUMN     "nivel_madurez_tecnologica" TEXT,
ADD COLUMN     "tecnologias_utilizadas" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "estado_proyecto" SET DEFAULT 'PENDIENTE';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."CompanySize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CompanySize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sector" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubSector" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "sector_id" INTEGER NOT NULL,

    CONSTRAINT "SubSector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" SERIAL NOT NULL,
    "nombre_comercial" TEXT NOT NULL,
    "logo" TEXT,
    "telefono" TEXT NOT NULL,
    "email_contacto" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "sector_id" INTEGER NOT NULL,
    "subsector_id" INTEGER,
    "company_size_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Resource" (
    "id" SERIAL NOT NULL,
    "name_recurso" TEXT NOT NULL,
    "type_recurso" TEXT NOT NULL,
    "route_recurso" TEXT NOT NULL,
    "id_proyecto" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanySize_name_key" ON "public"."CompanySize"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_nombre_key" ON "public"."Sector"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Company_user_id_key" ON "public"."Company"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_categoria_key" ON "public"."Category"("name_categoria");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_rol_key" ON "public"."Role"("name_rol");

-- AddForeignKey
ALTER TABLE "public"."SubSector" ADD CONSTRAINT "SubSector_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "public"."Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "public"."Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_subsector_id_fkey" FOREIGN KEY ("subsector_id") REFERENCES "public"."SubSector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_company_size_id_fkey" FOREIGN KEY ("company_size_id") REFERENCES "public"."CompanySize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resource" ADD CONSTRAINT "Resource_id_proyecto_fkey" FOREIGN KEY ("id_proyecto") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
