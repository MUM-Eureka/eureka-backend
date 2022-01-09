require('dotenv').config(); // to allow typeorm to infer outside of nest app

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ['src/*/*.entity.ts', 'dist/*/*.entity.js'],
  synchronize: false,
  logging: [],
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations'
  }
};
