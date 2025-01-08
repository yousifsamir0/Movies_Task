import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SearchQueriesDto } from './dtos/search-dto';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class OmdbService {

    private readonly BASE_URL: string;
    private readonly API_KEY: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.BASE_URL = this.configService.getOrThrow("OMDB_BASE_URL");
        this.API_KEY = this.configService.getOrThrow("OMDB_API_KEY");
    }

    async search(searchQueries: SearchQueriesDto) {
        const params = {
            apikey: this.API_KEY,
            ...searchQueries
        }
        try {
            const response = await lastValueFrom(
                this.httpService.get(this.BASE_URL, { params }),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                error.response?.data?.message || 'Failed to fetch movies',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        // return reponse;
    }


}
