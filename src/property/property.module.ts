import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  controllers: [PropertyController],
  providers: [
    PropertyService,
    // Module-scoped pipe
    // {
    //   provide: 'APP_PIPE',
    //   useValue: new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //   }),
    // },
  ],
})
export class PropertyModule {}
