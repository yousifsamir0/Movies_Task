import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class MoviesService {

  constructor(private readonly prisma: PrismaService) {

  }

  async create(createMovieDto: CreateMovieDto) {

    const movieExist = await this.prisma.movie.findUnique({
      where: {
        movieId: createMovieDto.movieId
      }
    })
    if (movieExist) {
      throw new ConflictException("this movie is already exist ! ")
    }

    const movie = await this.prisma.movie.create({
      data: {
        movieId: createMovieDto.movieId,
        title: createMovieDto.title,
        image: createMovieDto.image,
        year: createMovieDto.year
      }
    });

    return movie;
  }

  findAll() {
    return this.prisma.movie.findMany();
  }

  async findOne(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id
      }
    })
    if (!movie) {
      throw new NotFoundException("This movie is not found !");
    }
    return movie;
  }


  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);
    const updated = await this.prisma.movie.update({
      where: { id: movie.id },
      data: {
        ...updateMovieDto
      }
    });
    console.log(updated)
    return updated;
  }

  async remove(id: number) {
    const movie = await this.findOne(id)
    const result = this.prisma.movie.delete({ where: { id: movie.id } })
    return result;
  }
}
