import { Migration } from '@mikro-orm/migrations';

export class Migration20240523160143 extends Migration {

  async up(): Promise<void> {
    this.addSql('CREATE TABLE "product" ("id" UUID PRIMARY KEY, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "title" VARCHAR(100) NOT NULL, "description" VARCHAR(1000) NOT NULL, "price" NUMERIC NOT NULL);');
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE "product";');
  }

}
