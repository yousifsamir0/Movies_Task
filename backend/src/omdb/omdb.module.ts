import { Global, Module } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import { HttpModule } from '@nestjs/axios';


@Global()
@Module({
  imports: [HttpModule],
  providers: [OmdbService],
  exports: [OmdbService]
})
export class OmdbModule { }
