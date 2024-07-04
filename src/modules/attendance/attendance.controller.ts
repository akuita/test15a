import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AttendanceService } from './attendance.service';
import { RecordEmployeeCheckInDto } from './dto/record-employee-check-in.dto';

@ApiTags('Attendance')
@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/check-in')
  @UseGuards(AuthGuard)
  async recordEmployeeCheckIn(@Body() recordEmployeeCheckInDto: RecordEmployeeCheckInDto) {
    try {
      const { confirmation, employeeDetails, checkInTime } = await this.attendanceService.recordEmployeeCheckIn(
        recordEmployeeCheckInDto.employeeId,
        recordEmployeeCheckInDto.checkInTime,
        recordEmployeeCheckInDto.date,
      );

      return {
        status: 200,
        message: confirmation,
        employee: {
          id: employeeDetails.id,
          name: employeeDetails.name,
          role: employeeDetails.role,
          check_in_time: checkInTime.toISOString(),
        },
      };
    } catch (error) {
      // Depending on the error type, return the appropriate status code and message
      // This is a simplified example, in a real-world scenario you would handle different
      // error types and possibly use error filters or interceptors for a cleaner approach
      if (error instanceof NotFoundException) {
        return { status: 400, message: error.message };
      } else if (error instanceof BadRequestException) {
        return { status: 422, message: error.message };
      } else {
        // Handle other types of errors (e.g., internal server error)
        return { status: 500, message: 'An unexpected error has occurred on the server.' };
      }
    }
  }
}