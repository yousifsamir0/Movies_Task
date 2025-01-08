import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { SearchQueriesDto } from "./dtos/search-dto";
import { OmdbService } from "./omdb.service";


@Controller("search")
export class OmdbController {
    constructor(private readonly omdbService: OmdbService) { }

    @Get()
    search(@Query() searchQueries: SearchQueriesDto) {
        return this.omdbService.search(searchQueries);
    }

}