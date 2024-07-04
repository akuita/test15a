import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class RecordEmployeeCheckInDto {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsDate()
  @IsNotEmpty()
  checkInTime: Date;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}