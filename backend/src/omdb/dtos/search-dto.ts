
export class SearchQueriesDto {

    s: string;
    type?: "movie" | "series" | "episode";
    y?: number;
    page?: number;
}
