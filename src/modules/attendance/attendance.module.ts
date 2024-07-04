import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { Employee } from 'src/entities/employees';
import { AttendanceRecord } from 'src/entities/attendance_records';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, AttendanceRecord])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}