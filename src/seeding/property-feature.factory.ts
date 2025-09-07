import { PropertyFeature } from '../entities/property-feature.entity';
import { setSeederFactory } from 'typeorm-extension';

export const PropertyFeatureFactory = setSeederFactory(
  PropertyFeature,
  (faker) => {
    const propertyFeature = new PropertyFeature();
    propertyFeature.bedrooms = faker.number.int({ min: 1, max: 5 });
    propertyFeature.bathrooms = faker.number.int({ min: 1, max: 3 });
    propertyFeature.parkingSpots = faker.number.int({ min: 0, max: 3 });
    propertyFeature.area = faker.number.int({ min: 20, max: 2500 });
    propertyFeature.hasBalcony = faker.datatype.boolean();
    propertyFeature.hasGardenYard = faker.datatype.boolean();
    propertyFeature.hasSwimmingPool = faker.datatype.boolean();
    return propertyFeature;
  },
);
