import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from './property.entity';

@Entity({ name: 'property_types' })
export class PropertyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Property, (property) => property.propertyType)
  properties: Property[];
}
