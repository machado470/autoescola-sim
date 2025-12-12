import { Module } from '@nestjs/common';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { StudentLessonsController } from './student-lessons.controller';
import { StudentsLessonsService } from './student-lessons.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [
    StudentsController,
    StudentLessonsController,
  ],
  providers: [
    StudentsService,
    StudentsLessonsService,
    PrismaService,
  ],
})
export class StudentsModule {}
