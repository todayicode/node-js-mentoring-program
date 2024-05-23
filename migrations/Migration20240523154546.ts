import { Migration } from '@mikro-orm/migrations';

export class Migration20240523154546 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists `cart_pos`;');

    this.addSql('drop table if exists `order_entity`;');

    this.addSql('drop table if exists `order_pos`;');

    this.addSql('drop table if exists `product_pos`;');

    this.addSql('drop table if exists `user_pos`;');
  }

}
