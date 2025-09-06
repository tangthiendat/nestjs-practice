import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [PropertyController],
  providers: [
    PropertyService,
    // Module-scoped pipe
    {
      provide: 'APP_PIPE',
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // 👈 REQUIRED for @Type to work
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class PropertyModule {}
