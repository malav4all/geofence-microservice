import { Module } from '@nestjs/common';
import { GeofenceModule } from './geofence/geofence.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: process.env.DB_URL,
      }),
    }),
    GeofenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
