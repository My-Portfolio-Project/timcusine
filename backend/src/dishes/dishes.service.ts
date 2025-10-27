import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { DatabaseService } from 'src/database/database.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary';
import { UpdateDishtDto } from './dto/update-dish.dto';

@Injectable()
export class DishesService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly cloudinary: CloudinaryService
  ) {}

  async createDishes(createDishDto: CreateDishDto) {
    try {
      const { price, name, rating, image, desc } = createDishDto;

      if (!name || !price || !rating || !desc) {
        throw new BadRequestException('Please fill in all fields');
      }

      let uploadedImageUrl: string = '';

      if (image) {
        try {
          const uploadedImage = await this.cloudinary
            .getCloudinary()
            .uploader.upload(image, {
              folder: 'timscusine'
            });

          uploadedImageUrl = uploadedImage.secure_url;
          console.log('✅ Image uploaded to Cloudinary:', uploadedImageUrl);
        } catch (error) {
          console.error('❌ Error uploading image to Cloudinary:', error);
          throw new BadRequestException('Error uploading image to Cloudinary');
        }
      }

      const dishes = await this.prisma.dishes.create({
        data: {
          name,
          price,
          rating,
          desc,
          image: uploadedImageUrl
        }
      });

      return { message: ' Dishes created successfully', dishes };

      return { message: 'Dish created successfully', dishes };
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new ConflictException(
        '❌ Something went wrong while creating dish'
      );
    }
  }

  async fetchAll(page = 1, limit = 5) {
    try {
      const skip = (page - 1) * limit;
      const dishes = await this.prisma.dishes.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      });

      const totalCount = await this.prisma.dishes.count();
      const totalPage = Math.ceil(totalCount / limit);

      if (dishes.length === 0) {
        throw new NotFoundException('Dishes list is empty');
      }

      return {
        dishes,
        totalPage,
        skip,
        page
      };
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        '❌ Something went wrong while fetching dishes'
      );
    }
  }

  async fetchSingle(id: string) {
    try {
      const dishes = await this.prisma.dishes.findUnique({
        where: { id }
      });

      if (!dishes) {
        throw new NotFoundException('Dishes not found');
      }

      return { dishes };
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        '❌ Something went wrong while fetching dishes'
      );
    }
  }

  async updateDish(id: string, updateDishDto: UpdateDishtDto) {
    try {
      // Find the dish
      const dish = await this.prisma.dishes.findUnique({ where: { id } });
      if (!dish) {
        throw new NotFoundException('Dish not found');
      }

      let imageUrl = dish.image;

      if (updateDishDto?.image) {
        try {
          if (dish.image) {
            const publicId = dish.image
              ? dish.image.split('/').pop()?.split('.')[0]
              : '';
            await this.cloudinary
              .getCloudinary()
              .uploader.destroy(`timcusine/${publicId}`);
          }

          // Upload new image
          const uploaded = await this.cloudinary
            .getCloudinary()
            .uploader.upload(updateDishDto.image, {
              folder: 'timcusine'
            });
          imageUrl = uploaded.secure_url;
        } catch (error) {
          console.error('❌ Error uploading image to Cloudinary:', error);
          throw new BadRequestException('Error uploading image to Cloudinary');
        }
      }

      // Update dish
      const updatedDish = await this.prisma.dishes.update({
        where: { id },
        data: {
          ...updateDishDto,
          image: imageUrl
        }
      });

      return { message: 'Dish updated successfully', dish: updatedDish };
    } catch (error) {
      console.error(error);
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      )
        throw error;
      throw new BadRequestException(
        '❌ Something went wrong while updating the dish'
      );
    }
  }

  async deleteDish(id: string) {
    try {
      const dishes = await this.prisma.dishes.findUnique({
        where: { id }
      });

      if (!dishes) {
        throw new NotFoundException('Dishes not found');
      }

      await this.prisma.dishes.delete({
        where: { id }
      });

      return { message: 'Dish deleted successfully' };
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        '❌ Something went wrong while fetching dishes'
      );
    }
  }
  async searchDish(searchTerm: string) {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        throw new BadRequestException('Search term is required');
      }

      const dishes = await this.prisma.dishes.findMany({
        where: {
          OR: [
            {
              id: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          ]
        }
      });

      return {
        message:
          dishes.length > 0
            ? `Found ${dishes.length} dish${dishes.length > 1 ? 'es' : ''}`
            : 'No dishes found',
        data: dishes
      };
    } catch (error) {
      console.error('Error searching dishes:', error);
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        '❌ Something went wrong while fetching dishes'
      );
    }
  }
}
