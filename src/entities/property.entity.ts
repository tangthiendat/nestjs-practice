import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyFeature } from './property-feature.entity';
import { User } from './user.entity';
import { PropertyType } from './property-type.entity';

@Entity({ name: 'properties' })
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @OneToOne(
    () => PropertyFeature,
    (propertyFeature) => propertyFeature.property,
    { cascade: true },
  )
  propertyFeature: PropertyFeature;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'owner_id' })
  user: User;

  @ManyToMany(() => User, (user) => user.likedProperties)
  likedByUsers: User[];

  @ManyToOne(() => PropertyType, (propertyType) => propertyType.properties)
  @JoinColumn({
    name: 'property_type_id',
    referencedColumnName: 'id',
  })
  propertyType: PropertyType;
}
