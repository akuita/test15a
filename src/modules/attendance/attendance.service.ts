import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckInTimeValidator } from '/src/shared/validators/check-in-time.validator.ts';
import { Employee } from '/src/entities/employees.ts';
import { AttendanceRecord } from '/src/entities/attendance_records.ts';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
  ) {}

  async validateCheckInTime(employee_id: number, current_time: Date): Promise<void> {
    const checkInTimeValidator = new CheckInTimeValidator();
    const validationResult = checkInTimeValidator.validate(current_time);

    if (!validationResult.isValid) {
      throw new BadRequestException(validationResult.message);
    }

    // Additional logic to handle check-in can be added here if needed
  }

  // Other methods of the AttendanceService can be added here
}