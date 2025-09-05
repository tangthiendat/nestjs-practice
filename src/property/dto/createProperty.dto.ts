import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'The name of the property',
    example: 'Beautiful House',
  })
  @IsString()
  @Length(1, 100, { message: 'Name is too long' })
  name: string;

  @ApiProperty({
    description: 'The description of the property',
    example: 'A beautiful house with 3 bedrooms and 2 bathrooms.',
  })
  @IsString()
  @Length(1, 500, { message: 'Description is too long' })
  description: string;

  @ApiProperty({
    description: 'The price of the property',
    example: 250000,
  })
  @IsPositive()
  price: number;
}
