// infered from ConfigModule
export default {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // entities: [join(__dirname, '**', '*.entity.{ts,')],
  // entities: ["dist/entity/**/*.js"],
  synchronize: false,
  logging: [],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations'
  }
};
