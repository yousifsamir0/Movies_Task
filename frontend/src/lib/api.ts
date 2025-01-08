import { IQueryParams, SearchResponse } from '../types';
import axios from "axios"

const API_URL = process.env.OMDB_BASE_URL || "http://www.localhost:3000/search/";

export async function searchMovies(params: IQueryParams): Promise<SearchResponse> {
    try {
        console.log(params)
        const response = await axios.get(API_URL, { params });
        console.log(response.data)
        return response.data;
    }
    catch (e) {
        throw new Error('Failed to fetch movies');
    }
}

