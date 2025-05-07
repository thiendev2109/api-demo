import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SeedsService } from './seeds.service';

@Injectable()
export class SeedCommand {
  constructor(private readonly seedsService: SeedsService) {}

  @Command({
    command: 'seed:data',
    describe: 'Seed the database with initial data',
  })
  async seed() {
    console.log('🌱 Starting seeding...');
    await this.seedsService.seed();
    console.log('✅ Seeding completed!');
  }
} 