import { IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    example: 'My Updated Post',
    description: 'The title of the post',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @ApiProperty({
    example: 'This is the updated content of my post...',
    description: 'The content of the post',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  content?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the post is published',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
} 