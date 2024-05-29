import { Migration } from '@mikro-orm/migrations';

export class Migration20240523155909 extends Migration {

  async up(): Promise<void> {
    this.addSql('CREATE TABLE "user" ("id" UUID PRIMARY KEY, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "email" VARCHAR(255) NOT NULL, "password" VARCHAR(255) NOT NULL, "role" VARCHAR(255) NOT NULL);');
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE "user";');
  }

}
