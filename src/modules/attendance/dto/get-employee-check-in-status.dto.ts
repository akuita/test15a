import { IsNumber, IsDateString } from 'class-validator';

export class GetEmployeeCheckInStatusDto {
  @IsNumber({}, { message: 'employeeId must be a number' })
  employeeId: number;

  @IsDateString({}, { message: 'date must be a valid date string' })
  date: Date;
}