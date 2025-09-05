import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'real_estate',
  username: 'postgres',
  password: '123456',
  synchronize: true,
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
};
