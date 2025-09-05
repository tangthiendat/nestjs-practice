import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { PropertyService } from './property.service';

@Controller('/properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  getAllProperties() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  getPropertyById(
    @Param('id', ParseIntPipe) id: number,
    // @Query('isVerified', ParseBoolPipe) isVerified: boolean,
  ) {
    // console.log('Is Verified:', isVerified);
    return this.propertyService.findOne(id);
  }

  @Post()
  createProperty(
    @Body()
    body: CreatePropertyDto,
  ) {
    return this.propertyService.create(body);
  }

  @Patch(':id')
  updateProperty(
    @Param('id', ParseIdPipe) id: number,
    @Body() body: UpdatePropertyDto,
    // @RequestHeader(HeadersDto) headers: HeadersDto,
  ) {
    return this.propertyService.update(id, body);
  }

  @Delete(':id')
  deleteProperty(@Param('id', ParseIdPipe) id: number) {
    return this.propertyService.delete(id);
  }
}
