'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MovieCard } from '../components/movie-card';
import { searchMovies } from '../lib/api';
import { Movie } from '../types';

export function SearchResults() {
    const searchParams = useSearchParams();
    const s = searchParams.get('s') || '';
    const type = searchParams.get('type') || '';
    const y = searchParams.get('y') || '';
    const page = searchParams.get('page') || '';

    const [movies, setMovies] = useState<Movie[]>([]);
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        if (s) {
            searchMovies({ s, y, type, page }).then((data) => {
                console.log(data)
                setMovies(data.Search || [])
            }
            );
        }
    }, [searchParams]);


    const toggleFavorite = (movie: Movie) => {

        // add favorite to localstorage for now 
        // Todo: using api
        const newFavorites = favorites.some((fav) => fav.imdbID === movie.imdbID)
            ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
            : [...favorites, movie];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onAddToFavorites={toggleFavorite}
                    isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                />
            ))}
        </div>
    );
}

