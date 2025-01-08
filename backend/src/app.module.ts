import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { OmdbModule } from './omdb/omdb.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MoviesModule,
    PrismaModule,
    OmdbModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
