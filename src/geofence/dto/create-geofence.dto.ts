import { IsString, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class GeometryDto {
  @IsString() type: string;
  @IsObject() coordinates: number[];
  @IsNumber() radius: number;
}

class GeoCodeDto {
  @IsString() type: string;

  @ValidateNested()
  @Type(() => GeometryDto)
  geometry: GeometryDto;
}

export class CreateGeofenceDto {
  @IsString() clientId: string;
  @IsString() name: string;
  @IsNumber() mobileNumber: number;

  @IsObject()
  address: {
    zipCode: string;
    country: string;
    state: string;
    area: string;
    city: string;
    district: string;
  };

  @IsString() finalAddress: string;

  @ValidateNested()
  @Type(() => GeoCodeDto)
  geoCodeData: GeoCodeDto;

  @IsString() createdBy: string;
}
