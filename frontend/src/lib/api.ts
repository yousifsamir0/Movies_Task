import { IQueryParams, Movie, SearchResponse } from '../types';
import axios, { isAxiosError } from "axios"

const API_URL = process.env.OMDB_BASE_URL || "http://www.localhost:3000/";

export async function searchMovies(params: IQueryParams): Promise<SearchResponse> {
    try {
        console.log(params)
        const response = await axios.get(`${API_URL}search/`, { params });
        console.log(response.data)
        return response.data;
    }
    catch (e) {
        throw new Error('Failed to fetch movies');
    }
}

export async function getMovies(): Promise<Movie[]> {
    try {

        const response = await axios.get(`${API_URL}movies/`);
        return response.data;
    }
    catch (e) {
        console.log(e)
        throw new Error('Failed to fetch movies');
    }
}
export async function createMovie(movie: Movie): Promise<Movie> {
    try {

        console.log(`${API_URL}movies/`)
        console.log(movie)
        const response = await axios.post(`${API_URL}movies/`, {
            ...movie,
            Year: parseInt(movie.Year),
        });
        return response.data;
    }
    catch (e) {
        if (isAxiosError(e) && e.status === 409) {
            throw new Error("409")
        } else {
            throw new Error('Failed to fetch movies');
        }
    }
}

export async function removeMovie(movie: Movie): Promise<Movie> {
    try {
        const response = await axios.delete(`${API_URL}movies/${movie.imdbID}/`);
        return response.data;
    }
    catch (e) {
        if (isAxiosError(e) && e.status === 404) {
            throw new Error("404")
        } else {
            throw new Error('Failed to fetch movies');
        }
    }
}

export async function updateMovie(movie: Movie): Promise<Movie> {
    try {
        const response = await axios.patch(`${API_URL}movies/${movie.imdbID}`, {
            ...movie,
            Year: parseInt(movie.Year)
        });
        return response.data;
    }
    catch (e) {
        if (isAxiosError(e) && e.status === 404) {
            throw new Error("404")
        } else {
            throw new Error('Failed to fetch movies');
        }
    }
}



export async function getMovieById(params: IQueryParams): Promise<SearchResponse> {
    try {

        const response = await axios.get(API_URL, { params });
        console.log(response.data)
        return response.data;
    }
    catch (e) {
        throw new Error('Failed to fetch movies');
    }
}




