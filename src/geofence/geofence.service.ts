import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Geofence } from './geofence.schema';
import { CreateGeofenceDto } from './dto/create-geofence.dto';
import { UpdateGeofenceDto } from './dto/update-geofence.dto';

@Injectable()
export class GeofenceService {
  constructor(
    @InjectModel(Geofence.name) private geofenceModel: Model<Geofence>
  ) {}

  async create(createGeofenceDto: CreateGeofenceDto): Promise<Geofence> {
    try {
      // Check for duplicate geofence by name OR coordinates
      const existingGeofence = await this.geofenceModel
        .findOne({
          $or: [
            { name: createGeofenceDto.name }, // Check if name exists
            {
              'geoCodeData.geometry.coordinates':
                createGeofenceDto.geoCodeData.geometry.coordinates,
            }, // Check if coordinates exist
          ],
        })
        .exec();

      if (existingGeofence) {
        throw new BadRequestException(
          'A geofence with the same name or coordinates already exists.'
        );
      }

      // Save new geofence if no duplicate found
      const createdGeofence = new this.geofenceModel(createGeofenceDto);
      return await createdGeofence.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(
    page: number,
    limit: number
  ): Promise<{ data: Geofence[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.geofenceModel.find().skip(skip).limit(limit).exec(),
        this.geofenceModel.countDocuments().exec(),
      ]);
      return { data, total };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve geofences: ' + error.message
      );
    }
  }

  async search(
    page: number,
    limit: number,
    searchText: string
  ): Promise<{ data: Geofence[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const query = {
        $or: [
          { name: new RegExp(searchText, 'i') },
          { locationType: new RegExp(searchText, 'i') },
          { 'address.city': new RegExp(searchText, 'i') },
          { 'address.state': new RegExp(searchText, 'i') },
        ],
      };

      const [data, total] = await Promise.all([
        this.geofenceModel.find(query).skip(skip).limit(limit).exec(),
        this.geofenceModel.countDocuments(query).exec(),
      ]);
      return { data, total };
    } catch (error) {
      throw new BadRequestException(
        'Failed to search geofences: ' + error.message
      );
    }
  }

  async findOne(id: string): Promise<Geofence> {
    try {
      const geofence = await this.geofenceModel.findById(id).exec();
      if (!geofence)
        throw new NotFoundException(`Geofence with ID ${id} not found`);
      return geofence;
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve geofence: ' + error.message
      );
    }
  }

  async update(
    id: string,
    updateGeofenceDto: UpdateGeofenceDto
  ): Promise<Geofence> {
    try {
      const updatedGeofence = await this.geofenceModel
        .findByIdAndUpdate(id, updateGeofenceDto, { new: true })
        .exec();
      if (!updatedGeofence)
        throw new NotFoundException(`Geofence with ID ${id} not found`);
      return updatedGeofence;
    } catch (error) {
      throw new BadRequestException(
        'Failed to update geofence: ' + error.message
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.geofenceModel.findByIdAndDelete(id).exec();
      if (!result)
        throw new NotFoundException(`Geofence with ID ${id} not found`);
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete geofence: ' + error.message
      );
    }
  }
}
