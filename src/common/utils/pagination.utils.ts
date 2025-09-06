import { PaginationDto } from 'src/property/dto/pagination.dto';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from '../constants/pagination.constants';

export function buildPaginationCriteria(paginationDto: PaginationDto) {
  const take = Math.min(
    paginationDto.pageSize || DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
  );
  const skip = ((paginationDto.page || DEFAULT_PAGE) - 1) * take;
  return { take, skip };
}
