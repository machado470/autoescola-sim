import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [
    AuthModule,
    HealthModule,
    LessonsModule,
  ],
})
export class AppModule {}
