import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Address {
  @Prop({}) zipCode: string;
  @Prop({}) country: string;
  @Prop({}) state: string;
  @Prop({}) area: string;
  @Prop({}) city: string;
  @Prop({}) district: string;
}

@Schema()
export class Geometry {
  @Prop({}) type: string;
  @Prop({ type: [Number] }) coordinates: number[];
  @Prop({}) radius: number;
}

@Schema()
export class GeoCode {
  @Prop({}) type: string;
  @Prop({}) geometry: Geometry;
}

@Schema({ timestamps: true })
export class Geofence extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;
  @Prop({}) name: string;
  @Prop({}) locationType: string;
  @Prop({}) mobileNumber: number;
  @Prop({}) address: Address;
  @Prop({}) finalAddress: string;
  @Prop({ type: Object }) geoCodeData: GeoCode;
  @Prop({}) createdBy: string;
  @Prop({ default: false }) isPrivate: boolean;
  @Prop({ default: false }) isPublic: boolean;
}

export const GeofenceSchema = SchemaFactory.createForClass(Geofence);
