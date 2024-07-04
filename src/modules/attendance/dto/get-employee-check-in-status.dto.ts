import { IsNumber, IsDateString } from 'class-validator';

export class GetEmployeeCheckInStatusDto {
  @IsNumber({}, { message: 'employee_id must be a number' })
  employeeId: number;

  @IsDateString({}, { message: 'date must be a valid date string' })
  date: Date;
}