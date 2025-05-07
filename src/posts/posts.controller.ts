import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto, PostsResponseDto } from './dto/post.response.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: PostResponseDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createPostDto: CreatePostDto, @Request() req) {
    const post = await this.postsService.create(createPostDto, req.user);
    return new PostResponseDto(post);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Return all posts.',
    type: PostsResponseDto
  })
  async findAll() {
    const posts = await this.postsService.findAll();
    return new PostsResponseDto(posts);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the post.',
    type: PostResponseDto
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    return new PostResponseDto(post);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
    type: PostResponseDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    const post = await this.postsService.update(id, updatePostDto);
    return new PostResponseDto(post);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'The post has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
