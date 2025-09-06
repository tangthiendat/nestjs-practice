import { pgConfig } from '../../dbConfig';
import { DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MainSeeder } from './main.seeder';
import { PropertyFactory } from './property.factory';
import { PropertyFeatureFactory } from './propertyFeature.factory';
import { UserFactory } from './user.factory';

const options: DataSourceOptions & SeederOptions = {
  ...pgConfig,
  factories: [PropertyFactory, PropertyFeatureFactory, UserFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource
  .initialize()
  .then(async () => {
    // await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
