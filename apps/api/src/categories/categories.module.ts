import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule, // 🔥 O IMPORT QUE FALTAVA
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    PrismaService,
  ],
})
export class CategoriesModule {}
