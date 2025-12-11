import { Module } from '@nestjs/common';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { StudentLessonsController } from './student-lessons.controller';
import { StudentsLessonsService } from './student-lessons.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [
    StudentsController,
    StudentLessonsController, // ← novo controller registrado
  ],
  providers: [
    StudentsService,
    StudentsLessonsService,  // ← novo service registrado
    PrismaService,
  ],
})
export class StudentsModule {}
