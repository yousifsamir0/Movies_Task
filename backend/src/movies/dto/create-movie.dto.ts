import { IsNumber, IsString } from "class-validator";

export class CreateMovieDto {

    @IsString()
    movieId: string;

    @IsString()
    title: string;

    @IsNumber()
    year: number;

    @IsString()
    image: string;
}
