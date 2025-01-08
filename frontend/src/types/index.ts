export interface Movie {
    id?: number;
    imdbID: string;
    Type: string;
    Title: string;
    Year: string;
    Poster: string;
}
export interface SearchResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
}

export interface IQueryParams {
    s: string;
    type?: string;
    y?: string;
    page?: string;
}


