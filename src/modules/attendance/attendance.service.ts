import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckInTimeValidator } from 'src/shared/validators/check-in-time.validator.ts';
import { Employee } from 'src/entities/employees';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
    private checkInTimeValidator: CheckInTimeValidator
  ) {}

  async recordEmployeeCheckIn(employeeId: number, checkInTime: Date, date: Date): Promise<{ confirmation: string; employeeDetails: Employee; checkInTime: Date }> {
    // Validate if the employee_id exists
    const employee = await this.employeeRepository.findOneBy({ id: employeeId });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    // Validate check-in time against permissible hours
    const validationArgs: ValidationArguments = {
      value: checkInTime,
      constraints: [],
      targetName: 'checkInTime',
      object: { employee_id: employeeId },
      property: 'checkInTime'
    };
    if (!(await this.checkInTimeValidator.validate(checkInTime, validationArgs))) {
      throw new BadRequestException("Check-in not allowed outside permissible hours.");
    }

    // Check if an entry exists for the given employee_id and date
    const attendanceRecord = await this.attendanceRecordRepository.findOneBy({
      employee_id: employeeId,
      date: date
    });

    // If an entry exists and check_in_time is not null, throw an error
    if (attendanceRecord && attendanceRecord.check_in_time) {
      throw new BadRequestException(`Employee with ID ${employeeId} has already checked in on ${date}`);
    }

    // If no entry exists or check_in_time is null, create or update the entry
    if (!attendanceRecord) {
      await this.attendanceRecordRepository.save({
        employee_id: employeeId,
        check_in_time: checkInTime,
        date: date,
        status: 'Checked in'
      });
    } else {
      attendanceRecord.check_in_time = checkInTime;
      attendanceRecord.status = 'Checked in';
      await this.attendanceRecordRepository.save(attendanceRecord);
    }

    // Update the login_status in the Employee entity to true
    employee.login_status = true;
    await this.employeeRepository.save(employee);

    // Return a confirmation message with employee details and check-in time
    return {
      confirmation: `Employee check-in recorded successfully`,
      employeeDetails: employee,
      checkInTime: checkInTime
    };
  }
}