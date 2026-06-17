-- CreateTable
CREATE TABLE "public"."Role" (
    "id" SERIAL NOT NULL,
    "name_rol" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name_usuario" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,
    "password_usuario" TEXT NOT NULL,
    "rol_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name_categoria" TEXT NOT NULL,
    "description_categoria" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "name_proyecto" TEXT NOT NULL,
    "descripcion_proyecto" TEXT NOT NULL,
    "fecha_registro_proyecto" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado_proyecto" TEXT NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_usuario_key" ON "public"."User"("email_usuario");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
