import { Module } from '@nestjs/common';
import { GeofenceService } from './geofence.service';
import { GeofenceController } from './geofence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GeofenceSchema, Geofence } from './geofence.schema';
import { UserSchema, User } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Geofence.name, schema: GeofenceSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],

  providers: [GeofenceService],
  controllers: [GeofenceController],
})
export class GeofenceModule {}
