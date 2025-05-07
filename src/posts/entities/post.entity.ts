import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the post' })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Post',
  })
  title: string;

  @Column('text')
  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of my first post...',
  })
  content: string;

  @Column({ default: false })
  @ApiProperty({
    description: 'Whether the post is published',
    example: false,
  })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  @ApiProperty({
    description: 'The author of the post',
    type: () => User,
  })
  author: User;

  @CreateDateColumn()
  @ApiProperty({ description: 'The date when the post was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'The date when the post was last updated' })
  updatedAt: Date;
} 