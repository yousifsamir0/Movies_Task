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
        imdbID: createMovieDto.imdbID
      }
    })
    if (movieExist) {
      throw new ConflictException("this movie is already exist ! ")
    }

    const movie = await this.prisma.movie.create({
      data: {
        ...createMovieDto,
      }
    });

    return movie;
  }

  findAll() {
    return this.prisma.movie.findMany();
  }

  async findOne(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        imdbID: id
      }
    })
    if (!movie) {
      throw new NotFoundException("This movie is not found !");
    }
    return movie;
  }


  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);
    const updated = await this.prisma.movie.update({
      where: { imdbID: movie.imdbID },
      data: {
        ...updateMovieDto
      }
    });
    console.log(updated)
    return updated;
  }

  async remove(id: string) {
    const movie = await this.findOne(id)
    const result = this.prisma.movie.delete({ where: { imdbID: movie.imdbID } })
    return result;
  }
}
