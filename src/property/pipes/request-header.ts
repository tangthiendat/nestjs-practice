import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const RequestHeader = createParamDecorator(
  async (targetDto: any, ctx: ExecutionContext) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const headers = ctx.switchToHttp().getRequest().headers;

      console.log('Raw headers:', headers);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const dto = plainToInstance(targetDto, headers, {
        excludeExtraneousValues: true,
      });

      console.log('Transformed DTO:', dto);

      // await validateOrReject(dto);

      const errors = await validate(dto);

      if (errors.length > 0) {
        console.log('Validation errors:', errors);

        const errorMessages = errors.map((error) => {
          const constraints = error.constraints || {};
          const messages = Object.values(constraints);
          return {
            property: error.property,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            value: error.value,
            messages: messages,
          };
        });

        throw new BadRequestException({
          message: 'Header validation failed',
          statusCode: 400,
          errors: errorMessages,
        });
      }

      return dto;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Unexpected error in RequestHeader decorator:', error);
      throw new BadRequestException({
        message: 'Header processing failed',
        statusCode: 400,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },
);
