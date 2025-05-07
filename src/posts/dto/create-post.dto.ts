import { IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'My First Post',
    description: 'The title of the post',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'This is the content of my first post...',
    description: 'The content of the post',
  })
  @IsString()
  @MinLength(10)
  content: string;

  @ApiProperty({
    example: true,
    description: 'Whether the post is published',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
} 