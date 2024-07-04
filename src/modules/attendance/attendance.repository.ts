import { EntityRepository } from 'typeorm';
import { AttendanceRecord } from '../../entities/attendance_records';
import { BaseRepository } from '../../shared/base.repository';

@EntityRepository(AttendanceRecord)
export class AttendanceRepository extends BaseRepository<AttendanceRecord> {
  async findAttendanceRecordByEmployeeAndDate(employeeId: number, date: Date): Promise<AttendanceRecord | null> {
    const attendanceRecord = await this.findOne({
      where: {
        employee_id: employeeId,
        date: date
      }
    });
    return attendanceRecord || null;
  }
}