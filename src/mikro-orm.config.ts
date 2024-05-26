import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations'
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: Options = {
  dbName: 'node_gmp',
  driver: PostgreSqlDriver,
  // folder-based discovery setup, using common filename suffix
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  user: 'node_gmp', // your PostgreSQL username
  password: 'password123', // your Postg
  // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
  // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
  metadataProvider: TsMorphMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: true,
  extensions: [SeedManager, Migrator],
  seeder: {
    path: 'dist/seeders', // path to the folder with compiled seeders
    pathTs: '', // path to the folder with TS seeders
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
  migrations: {
    path: './migrations', // path to the folder with migrations
  }
};

export default config;
