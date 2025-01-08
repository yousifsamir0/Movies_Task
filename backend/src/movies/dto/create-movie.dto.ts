import { IsNumber, IsString } from "class-validator";

export class CreateMovieDto {

    @IsString()
    imdbID: string;

    @IsString()
    Title: string;

    @IsNumber()
    Year: number;

    @IsString()
    Poster: string;

    @IsString()
    Type: string;
}
