import * as dotenv from 'dotenv';

// used for migrations in dev
const env_name = 'development';
const dotenv_path = `${process.cwd()}/config/env/${env_name}.env`;
const result = dotenv.config({ path: dotenv_path });
console.log(`environment variables from ${env_name} ${result.parsed ? 'succesfully' : 'unsuccessfully'} populated`);

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/*/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: [],
  cli: {
    migrationsDir: 'src/migrations'
  }
};
