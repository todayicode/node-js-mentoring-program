import { Migration } from '@mikro-orm/migrations';

export class Migration20240523160552 extends Migration {

  async up(): Promise<void> {
    this.addSql('CREATE TABLE "cart" ("id" UUID PRIMARY KEY, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "user_id" UUID NOT NULL, "is_deleted" BOOLEAN NOT NULL, FOREIGN KEY("user_id") REFERENCES "user"("id"));');
    this.addSql('CREATE TABLE "cart_item" ("id" UUID PRIMARY KEY, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "cart_id" UUID NOT NULL, "product_id" UUID NOT NULL, "count" INTEGER NOT NULL, FOREIGN KEY("cart_id") REFERENCES "cart"("id"), FOREIGN KEY("product_id") REFERENCES "product"("id"));');
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE "cart";');
    this.addSql('DROP TABLE "cart_item";');
  }

}
