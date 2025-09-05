/* eslint-disable @typescript-eslint/no-unsafe-call */

export class CreatePropertyDto {
  // @IsString()
  // @Length(1, 100, { message: 'Name is too long' })
  name: string;

  // @IsString()
  // @Length(1, 500, { message: 'Description is too long' })
  description: string;

  // @IsInt()
  area: number;
}
