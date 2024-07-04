import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AttendanceService } from './attendance.service';
import { GetEmployeeCheckInStatusDto } from './dto/get-employee-check-in-status.dto';

@ApiTags('Attendance')
@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('/check-in/status')
  @UseGuards(AuthGuard)
  async getCheckInStatus(@Query() getEmployeeCheckInStatusDto: GetEmployeeCheckInStatusDto) {
    return await this.attendanceService.getEmployeeCheckInStatus(getEmployeeCheckInStatusDto.employeeId, getEmployeeCheckInStatusDto.date);
  }
}