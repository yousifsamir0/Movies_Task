import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OmdbController } from 'src/omdb/omdb.controller';


@Global()
@Module({
  controllers: [OmdbController],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }
