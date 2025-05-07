import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';
import { UserResponseDto } from '../../users/dto/user.response.dto';

export class PostResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the post',
    example: 'e2d7c1f0-5b9a-4b5c-8c1f-0b9a4b5c8c1f',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Blog Post',
  })
  title: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of my first blog post...',
  })
  content: string;

  @ApiProperty({
    description: 'The author of the post',
    type: () => UserResponseDto,
  })
  author: UserResponseDto;

  @ApiProperty({
    description: 'The date when the post was created',
    example: '2024-05-07T14:33:52Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the post was last updated',
    example: '2024-05-07T14:33:52Z',
  })
  updatedAt: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.author = new UserResponseDto(post.author);
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}

export class PostsResponseDto {
  @ApiProperty({
    description: 'List of posts',
    type: [PostResponseDto],
  })
  posts: PostResponseDto[];

  @ApiProperty({
    description: 'Total number of posts',
    example: 10,
  })
  total: number;

  constructor(posts: Post[]) {
    this.posts = posts.map((post) => new PostResponseDto(post));
    this.total = posts.length;
  }
}
