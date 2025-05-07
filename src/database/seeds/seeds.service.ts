import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async seed() {
    await this.seedUsers();
    await this.seedPosts();
  }

  private async seedUsers() {
    const users = [
      {
        email: 'john@example.com',
        password: 'password123',
        name: 'John Doe',
      },
      {
        email: 'jane@example.com',
        password: 'password123',
        name: 'Jane Smith',
      },
      {
        email: 'bob@example.com',
        password: 'password123',
        name: 'Bob Johnson',
      },
      {
        email: 'alice@example.com',
        password: 'password123',
        name: 'Alice Brown',
      },
      {
        email: 'charlie@example.com',
        password: 'password123',
        name: 'Charlie Wilson',
      },
      {
        email: 'diana@example.com',
        password: 'password123',
        name: 'Diana Miller',
      },
      {
        email: 'edward@example.com',
        password: 'password123',
        name: 'Edward Davis',
      },
      {
        email: 'fiona@example.com',
        password: 'password123',
        name: 'Fiona Taylor',
      },
      {
        email: 'george@example.com',
        password: 'password123',
        name: 'George Anderson',
      },
      {
        email: 'hannah@example.com',
        password: 'password123',
        name: 'Hannah Martinez',
      },
    ];

    for (const userData of users) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: userData.email },
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = this.usersRepository.create({
          ...userData,
          password: hashedPassword,
        });
        await this.usersRepository.save(user);
      }
    }
  }

  private async seedPosts() {
    const users = await this.usersRepository.find();
    const posts = [
      {
        title: 'Getting Started with NestJS',
        content: 'NestJS is a powerful framework for building efficient, scalable Node.js server-side applications...',
      },
      {
        title: 'Understanding TypeORM',
        content: 'TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native...',
      },
      {
        title: 'REST API Best Practices',
        content: 'REST APIs are the backbone of modern web applications. Here are some best practices...',
      },
      {
        title: 'Authentication with JWT',
        content: 'JWT (JSON Web Tokens) is a compact, URL-safe means of representing claims between two parties...',
      },
      {
        title: 'Database Design Patterns',
        content: 'Good database design is crucial for building scalable applications. Here are some patterns...',
      },
      {
        title: 'Testing in NestJS',
        content: 'Testing is an essential part of software development. NestJS provides excellent testing utilities...',
      },
      {
        title: 'Error Handling Strategies',
        content: 'Proper error handling is crucial for building robust applications. Here are some strategies...',
      },
      {
        title: 'API Documentation with Swagger',
        content: 'Swagger is a powerful tool for documenting REST APIs. Here\'s how to use it with NestJS...',
      },
      {
        title: 'Deployment Best Practices',
        content: 'Deploying applications requires careful consideration of various factors. Here are some best practices...',
      },
      {
        title: 'Performance Optimization',
        content: 'Performance optimization is crucial for building fast and efficient applications. Here are some tips...',
      },
    ];

    for (let i = 0; i < posts.length; i++) {
      const postData = posts[i];
      const author = users[i % users.length]; // Distribute posts among users

      const existingPost = await this.postsRepository.findOne({
        where: { title: postData.title },
      });

      if (!existingPost) {
        const post = this.postsRepository.create({
          ...postData,
          author,
        });
        await this.postsRepository.save(post);
      }
    }
  }
} 