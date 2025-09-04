/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(1, 100, { message: 'Name is too long' })
  name: string;

  @IsString()
  @Length(1, 500, { message: 'Description is too long' })
  description: string;

  @IsInt()
  area: number;
}
