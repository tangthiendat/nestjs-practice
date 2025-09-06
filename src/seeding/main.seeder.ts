import { faker } from '@faker-js/faker';
import { Property } from '../entities/property.entity';
import { PropertyFeature } from '../entities/propertyFeature.entity';
import { PropertyType } from '../entities/propertyType.entity';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const propertyTypeRepository = dataSource.getRepository(PropertyType);
    const propertyRepository = dataSource.getRepository(Property);

    console.log('Seeding Property Types...');
    const propertyTypes = await propertyTypeRepository.save([
      { name: 'Apartment' },
      { name: 'House' },
      { name: 'Condo' },
      { name: 'Townhouse' },
    ]);

    console.log('Seeding Users...');
    const userFactory = factoryManager.get(User);

    const users = await userFactory.saveMany(10);

    console.log('Seeding Properties...');
    const propertyFactory = factoryManager.get(Property);
    const propertyFeatureFactory = factoryManager.get(PropertyFeature);

    const properties = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          const property = await propertyFactory.make({
            user: faker.helpers.arrayElement(users),
            propertyType: faker.helpers.arrayElement(propertyTypes),
            propertyFeature: await propertyFeatureFactory.save(),
          });
          return property;
        }),
    );

    await propertyRepository.save(properties);
  }
}
