import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../entities/employees';
import { AttendanceRecord } from '../../entities/attendance_records';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, AttendanceRecord])],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}