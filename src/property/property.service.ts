import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { buildPaginationCriteria } from 'src/common/utils/pagination.utils';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../common/constants/pagination.constants';

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

  async findAll(paginationDto: PaginationDto) {
    const [data, total] = await this.propertyRepository.findAndCount({
      ...buildPaginationCriteria(paginationDto),
    });
    return {
      data,
      metadata: {
        totalElements: total,
        page: paginationDto.page || DEFAULT_PAGE,
        pageSize: paginationDto.pageSize || DEFAULT_PAGE_SIZE,
        totalPages: Math.ceil(
          total / (paginationDto.pageSize || DEFAULT_PAGE_SIZE),
        ),
      },
    };
  }

  async update(id: number, dto: UpdatePropertyDto) {
    return await this.propertyRepository.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.propertyRepository.delete({ id });
  }
}
