import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User, UserRole } from '../models/user.entity.js';
import { Product } from '../models/product.entity.js';
import bcrypt from 'bcrypt';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashedPassword = await bcrypt.hash('password', 10);

    const admin = em.create(User, {
      id: 'bb8c1ae9-d934-4f48-9f27-3cc6e2b30260',
      email: 'admin@example.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    const user = em.create(User, {
      id: 'bb8c1ae9-d934-4f48-9f27-3cc6e2b30261',
      email: 'user@example.com',
      password: hashedPassword,
      role: UserRole.USER,
    });

    const product1 = em.create(Product, {
      createdAt: '2024-05-23T02:28:17.780Z',
      updatedAt: '2024-05-23T02:28:17.780Z',
      title: 'Book',
      description: 'Interesting book',
      price: 200,
      id: 'daef0239-3cf6-4669-ab58-bb23ab21b1cb'
    });

    const product2 = em.create(Product, {
      createdAt: '2024-05-23T02:28:17.780Z',
      updatedAt: '2024-05-23T02:28:17.780Z',
      title: 'Book 2',
      description: 'Interesting book 2',
      price: 400,
      id: 'f993aeb3-c897-465a-be2f-c4cbd78940dd'
    });

    await em.persistAndFlush([user,admin, product1, product2]);

  }
}
