import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { SeedsService } from './seeds.service';
import { SeedCommand } from './seed.command';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    CommandModule
  ],
  providers: [SeedsService, SeedCommand],
  exports: [SeedsService],
})
export class SeedsModule {} 