import { Module } from '@nestjs/common';
import { GeofenceService } from './geofence.service';
import { GeofenceController } from './geofence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GeofenceSchema, Geofence } from './geofence.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Geofence.name, schema: GeofenceSchema },
    ]),
  ],

  providers: [GeofenceService],
  controllers: [GeofenceController],
})
export class GeofenceModule {}
