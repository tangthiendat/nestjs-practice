import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('/properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  getAllProperties() {
    return this.propertyService.getAllProperties();
  }

  @Get(':id')
  getPropertyById(@Param('id') id: number) {
    return this.propertyService.getPropertyById(id);
  }

  @Post()
  createProperty(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: 'Property created', data: body };
  }
}
