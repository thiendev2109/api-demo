import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';

@Controller('jsonp/posts')
export class JsonpPostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(
    @Res() res: Response,
    @Query('callback') callback?: string,
  ) {
    try {
      const posts = await this.postsService.findAll();
      
      // If no callback provided, return regular JSON
      if (!callback) {
        return res.json(posts);
      }

      // If callback provided, return JSONP
      const sanitizedCallback = callback.replace(/[^a-zA-Z0-9_]/g, '');
      res.setHeader('Content-Type', 'application/javascript');
      return res.send(`${sanitizedCallback}(${JSON.stringify(posts)});`);
    } catch (error) {
      if (!callback) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      const sanitizedCallback = callback.replace(/[^a-zA-Z0-9_]/g, '');
      res.setHeader('Content-Type', 'application/javascript');
      return res.send(`${sanitizedCallback}({"error": "Internal server error"});`);
    }
  }
} 