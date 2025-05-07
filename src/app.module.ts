import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/database.config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedsModule } from './database/seeds/seeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
      expandVariables: true,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    PostsModule,
    AuthModule,
    SeedsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
