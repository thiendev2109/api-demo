import { DataSource } from 'typeorm';
import { config } from './env.validation';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DATABASE_HOST,
  port: config.DATABASE_PORT,
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/*.entity{.ts,.js}', __dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: config.NODE_ENV !== 'production',
  logging: config.NODE_ENV === 'development',
});
