import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @Column()
  password: string;

  @Column()
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  name: string;

  @OneToMany(() => Post, (post) => post.author)
  @ApiProperty({
    description: 'The posts created by the user',
    type: () => [Post],
  })
  posts: Post[];

  @CreateDateColumn()
  @ApiProperty({ description: 'The date when the user was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'The date when the user was last updated' })
  updatedAt: Date;
}
