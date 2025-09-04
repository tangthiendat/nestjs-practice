import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {
  getAllProperties() {
    return [
      { id: 1, name: 'Property 1' },
      { id: 2, name: 'Property 2' },
    ];
  }

  getPropertyById(id: number) {
    return { id, name: `Property ${id}` };
  }
}
