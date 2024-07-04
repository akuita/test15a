import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
  ) {}

  async getEmployeeCheckInStatus(employeeId: number, date: Date): Promise<{ checkInStatus: 'enabled' | 'disabled' }> {
    try {
      const attendanceRecord = await this.attendanceRecordRepository.findOne({
        where: {
          employee_id: employeeId,
          date: date,
        },
      });

      if (attendanceRecord && attendanceRecord.check_in_time) {
        return { checkInStatus: 'disabled' };
      } else {
        return { checkInStatus: 'enabled' };
      }
    } catch (error) {
      // Handle the error appropriately (e.g., log the error, return a default status)
      console.error('Error fetching attendance record:', error);
      // Depending on the system's requirements, you might want to throw an error or return a default status
      throw error; // or return { checkInStatus: 'enabled' };
    }
  }
}