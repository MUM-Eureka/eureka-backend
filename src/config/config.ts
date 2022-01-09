// infered from ConfigModule
export default {
  type: process.env.DB_TYPE,
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  entities: [__dirname + '/../*/*.entity{.ts,.js}'],
  synchronize: false,
  logging: [],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations'
  }
};
