import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'e2d7c1f0-5b9a-4b5c-8c1f-0b9a4b5c8c1f'
  })
  id: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe'
  })
  name: string;

  @ApiProperty({
    description: 'The date when the user was created',
    example: '2024-05-07T14:33:52Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the user was last updated',
    example: '2024-05-07T14:33:52Z'
  })
  updatedAt: Date;

  constructor(user: User) {
    this.id = user?.id;
    this.email = user?.email;
    this.name = user?.name;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
  }
}

export class UsersResponseDto {
  @ApiProperty({
    description: 'List of users',
    type: [UserResponseDto]
  })
  users: UserResponseDto[];

  @ApiProperty({
    description: 'Total number of users',
    example: 10
  })
  total: number;

  constructor(users: User[]) {
    this.users = users.map(user => new UserResponseDto(user));
    this.total = users.length;
  }
} 