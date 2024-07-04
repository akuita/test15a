import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
export class CheckInTimeValidator implements ValidatorConstraintInterface {
  constructor(private configService: ConfigService, private dataSource: DataSource) {}

  async validate(current_time: Date, args: ValidationArguments) {
    const employee_id = args.object['employee_id'];
    // Retrieve permissible check-in hours from the system configuration
    const permissibleCheckInHours = this.configService.get('checkInHours');
    const currentTimeHours = current_time.getHours();

    // Compare the "current_time" with the permissible check-in hours
    if (
      currentTimeHours < permissibleCheckInHours.startHour ||
      currentTimeHours >= permissibleCheckInHours.endHour
    ) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    // Error message if check-in attempt is outside permissible hours
    return `Check-in is not allowed at this time.`;
  }
}

export function IsCheckInTimeValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckInTimeValidator,
    });
  };
}