import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { GeofenceService } from './geofence.service';
import { CreateGeofenceDto } from './dto/create-geofence.dto';
import { UpdateGeofenceDto } from './dto/update-geofence.dto';
import { ApiResponse } from 'src/comman/api-response';

@Controller('geofences')
export class GeofenceController {
  constructor(private readonly geofenceService: GeofenceService) {}

  @Post()
  async create(@Body() createGeofenceDto: CreateGeofenceDto) {
    try {
      const result = await this.geofenceService.create(createGeofenceDto);
      return new ApiResponse(
        true,
        HttpStatus.CREATED,
        'Geofence created successfully',
        result
      );
    } catch (error) {
      throw new HttpException(
        new ApiResponse(
          false,
          HttpStatus.BAD_REQUEST,
          'Failed to create geofence',
          null,
          error.message
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    try {
      const result = await this.geofenceService.findAll(+page, +limit);
      return new ApiResponse(
        true,
        HttpStatus.OK,
        'Geofences retrieved successfully',
        result
      );
    } catch (error) {
      throw new HttpException(
        new ApiResponse(
          false,
          HttpStatus.BAD_REQUEST,
          'Failed to retrieve geofences',
          null,
          error.message
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('search')
  async search(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('searchText') searchText = ''
  ) {
    try {
      const result = await this.geofenceService.search(
        +page,
        +limit,
        searchText
      );
      return new ApiResponse(
        true,
        HttpStatus.OK,
        'Search results retrieved successfully',
        result
      );
    } catch (error) {
      throw new HttpException(
        new ApiResponse(
          false,
          HttpStatus.BAD_REQUEST,
          'Failed to search geofences',
          null,
          error.message
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.geofenceService.findOne(id);
      return new ApiResponse(
        true,
        HttpStatus.OK,
        `Geofence with ID ${id} retrieved`,
        result
      );
    } catch (error) {
      throw new HttpException(
        new ApiResponse(
          false,
          HttpStatus.BAD_REQUEST,
          'Failed to get geofences',
          null,
          error.message
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGeofenceDto: UpdateGeofenceDto
  ) {
    try {
      const result = await this.geofenceService.update(id, updateGeofenceDto);
      return new ApiResponse(
        true,
        HttpStatus.OK,
        `Geofence with ID ${id} updated successfully`,
        result
      );
    } catch (error) {
      throw new HttpException(
        new ApiResponse(
          false,
          HttpStatus.BAD_REQUEST,
          'Failed to Update geofences',
          null,
          error.message
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.geofenceService.remove(id);
      return new ApiResponse(
        true,
        HttpStatus.NO_CONTENT,
        `Geofence with ID ${id} deleted successfully`
      );
    } catch (error) {
      throw new HttpException(
        new ApiResponse(
          false,
          HttpStatus.BAD_REQUEST,
          'Failed to delete geofences',
          null,
          error.message
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
