import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'real_estate',
  username: 'postgres',
  password: '123456',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
