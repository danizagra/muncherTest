-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "orders" (
    "id_order" SERIAL NOT NULL,
    "Products" TEXT[],
    "Price" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id_order")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
