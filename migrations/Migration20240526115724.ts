import { Migration } from '@mikro-orm/migrations';

export class Migration20240526115724 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
        CREATE TABLE "cart" (
          "id" UUID NOT NULL, 
          "created_at" TIMESTAMPTZ NOT NULL, 
          "updated_at" TIMESTAMPTZ NOT NULL, 
          "user_id" UUID NOT NULL, 
          "items" JSONB NOT NULL, 
          "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
          CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
        );
      `);
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "cart";');
  }
}
