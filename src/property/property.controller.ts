import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { PropertyService } from './property.service';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { CreatePropertySchema } from './dto/createPropertyZod.dto';

@Controller('/properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  getAllProperties() {
    return this.propertyService.getAllProperties();
  }

  @Get(':id')
  getPropertyById(
    @Param('id', ParseIntPipe) id: number,
    @Query('isVerified', ParseBoolPipe) isVerified: boolean,
  ) {
    console.log('Is Verified:', isVerified);
    return this.propertyService.getPropertyById(id);
  }

  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })))
  createProperty(
    @Body(new ZodValidationPipe(CreatePropertySchema))
    body: CreatePropertyDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: 'Property created', data: body };
  }

  @Put(':id')
  updateProperty(
    @Param('id', ParseIdPipe) id: number,
    @Body() body: Partial<CreatePropertyDto>,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: `Property ${id} updated`, data: body };
  }
}
