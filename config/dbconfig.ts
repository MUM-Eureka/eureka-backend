import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
const ENTITIES_BASE_PATH = process.env.NODE_ENV === 'production' ? 'dist/src' : 'src';
export default () =>
  ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ENTITIES_BASE_PATH + '/*/*.entity{.ts,.js}'],
    synchronize: false,
    ssl: false,
    logging: []
  } as PostgresConnectionOptions);
