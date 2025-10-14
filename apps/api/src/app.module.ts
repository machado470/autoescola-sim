import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';
import { SchoolModule } from './school/school.module';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [
    PrismaModule,
    SchoolModule,
    InstructorModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
