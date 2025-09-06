import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Property } from './src/entities/property.entity';
import { User } from './src/entities/user.entity';
import { PropertyType } from './src/entities/propertyType.entity';
import { PropertyFeature } from './src/entities/propertyFeature.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'real_estate',
  username: 'postgres',
  password: '123456',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [Property, User, PropertyType, PropertyFeature],
};
