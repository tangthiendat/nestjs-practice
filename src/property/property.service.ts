import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async findOne(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  async create(dto: CreatePropertyDto) {
    return await this.propertyRepository.save(dto);
  }

  async findAll() {
    return await this.propertyRepository.find();
  }

  async update(id: number, dto: UpdatePropertyDto) {
    return await this.propertyRepository.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.propertyRepository.delete({ id });
  }
}
