import { IsNotEmpty, IsString, IsInt, IsBoolean, IsEnum } from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvConfig {
  @IsNotEmpty({ message: 'NODE_ENV is required' })
  @IsEnum(Environment, { message: 'NODE_ENV must be one of: development, production, test' })
  NODE_ENV: Environment;

  @IsNotEmpty({ message: 'PORT is required' })
  @IsInt({ message: 'PORT must be a number' })
  PORT: number;

  @IsNotEmpty({ message: 'DATABASE_HOST is required' })
  @IsString({ message: 'DATABASE_HOST must be a string' })
  DATABASE_HOST: string;

  @IsNotEmpty({ message: 'DATABASE_PORT is required' })
  @IsInt({ message: 'DATABASE_PORT must be a number' })
  DATABASE_PORT: number;

  @IsNotEmpty({ message: 'DATABASE_USERNAME is required' })
  @IsString({ message: 'DATABASE_USERNAME must be a string' })
  DATABASE_USERNAME: string;

  @IsNotEmpty({ message: 'DATABASE_PASSWORD is required' })
  @IsString({ message: 'DATABASE_PASSWORD must be a string' })
  DATABASE_PASSWORD: string;

  @IsNotEmpty({ message: 'DATABASE_NAME is required' })
  @IsString({ message: 'DATABASE_NAME must be a string' })
  DATABASE_NAME: string;

  @IsNotEmpty({ message: 'DATABASE_SSL is required' })
  @IsBoolean({ message: 'DATABASE_SSL must be a boolean' })
  DATABASE_SSL: boolean;

  @IsNotEmpty({ message: 'JWT_SECRET is required' })
  @IsString({ message: 'JWT_SECRET must be a string' })
  JWT_SECRET: string;

  @IsNotEmpty({ message: 'JWT_EXPIRATION is required' })
  @IsString({ message: 'JWT_EXPIRATION must be a string' })
  JWT_EXPIRATION: string;
}

const envConfig = plainToInstance(EnvConfig, {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_SSL: process.env.DATABASE_SSL === 'true',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
});

export const config = envConfig; 