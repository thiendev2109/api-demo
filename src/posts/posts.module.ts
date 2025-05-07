import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JsonpPostsController } from './jsonp-posts.controller';
import { Post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController, JsonpPostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
