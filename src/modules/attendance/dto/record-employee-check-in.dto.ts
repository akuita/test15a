import { IsInt, IsNotEmpty } from 'class-validator';

export class RecordEmployeeCheckInDto {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsNotEmpty()
  checkInTime: Date;

  @IsNotEmpty()
  date: Date;
}