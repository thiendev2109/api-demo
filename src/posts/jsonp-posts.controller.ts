import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';

@Controller('jsonp/posts')
export class JsonpPostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(
    @Query('callback') callback: string,
    @Res() res: Response,
  ) {
    try {
      const posts = await this.postsService.findAll();
      const jsonResponse = JSON.stringify(posts);
      
      if (!callback) {
        return res.json(posts);
      }

      // Sanitize callback name to prevent XSS
      const sanitizedCallback = callback.replace(/[^a-zA-Z0-9_]/g, '');
      res.setHeader('Content-Type', 'application/javascript');
      return res.send(`${sanitizedCallback}(${jsonResponse});`);
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