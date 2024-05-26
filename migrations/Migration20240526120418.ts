import { Migration } from '@mikro-orm/migrations';

export class Migration20240526120418 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
    CREATE TABLE "order" (
      "id" UUID NOT NULL, 
      "created_at" TIMESTAMPTZ NOT NULL, 
      "updated_at" TIMESTAMPTZ NOT NULL, 
      "user_id" UUID NOT NULL, 
      "items" JSONB NOT NULL, 
      "comments" VARCHAR(255) NULL, 
      "status" VARCHAR(255) NOT NULL, 
      "total" INT NOT NULL, 
      "payment_type" VARCHAR(255) NOT NULL, 
      "payment_address" VARCHAR(255) NULL, 
      "payment_credit_card_number" VARCHAR(255) NULL, 
      "payment_credit_card_expiry" VARCHAR(255) NULL, 
      "delivery_type" VARCHAR(255) NOT NULL, 
      "delivery_address_country" VARCHAR(255) NOT NULL, 
      "delivery_address_city" VARCHAR(255) NOT NULL, 
      "delivery_address_street" VARCHAR(255) NOT NULL, 
      "delivery_address_pin" VARCHAR(255) NOT NULL, 
      CONSTRAINT "order_pkey" PRIMARY KEY ("id")
    );
        
        ALTER TABLE "order" ADD CONSTRAINT "order_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user" ("id");
      `);
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "order";');
  }
}
