import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { PropertyService } from './property.service';
import { ApiOperation } from '@nestjs/swagger';
import { Property } from 'src/entities/property.entity';
import { PaginationDto } from './dto/pagination.dto';

@Controller('/properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all properties',
    description: 'Retrieves a list of all properties.',
  })
  getAllProperties(@Query() paginationDto: PaginationDto) {
    return this.propertyService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get property by ID',
    description: 'Retrieves a property by its unique ID.',
  })
  getPropertyById(
    @Param('id', ParseIntPipe) id: number,
    // @Query('isVerified', ParseBoolPipe) isVerified: boolean,
  ): Promise<Property> {
    // console.log('Is Verified:', isVerified);
    return this.propertyService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new property',
    description: 'Creates a new property with the provided details.',
  })
  createProperty(
    @Body()
    body: CreatePropertyDto,
  ) {
    return this.propertyService.create(body);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an existing property',
    description: 'Updates the details of an existing property by ID.',
  })
  updateProperty(
    @Param('id', ParseIdPipe) id: number,
    @Body() body: UpdatePropertyDto,
    // @RequestHeader(HeadersDto) headers: HeadersDto,
  ) {
    return this.propertyService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a property',
    description: 'Deletes a property by its ID.',
  })
  deleteProperty(@Param('id', ParseIdPipe) id: number) {
    return this.propertyService.delete(id);
  }
}
