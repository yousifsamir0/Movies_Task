'use client';

import { useState, useEffect } from 'react';

import { Movie } from '../../types';
import { MovieCard } from '@/components/movie-card';
import { createMovie, getMovies, removeMovie } from '@/lib/api';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        getMovies().then((data) => {
            setFavorites(data)
        })
    }, []);



    const addToFavorite = async (movie: Movie) => {

        await createMovie(movie);
        const newFavorites = favorites.some((fav) => fav.imdbID === movie.imdbID)
            ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
            : [...favorites, movie];
        setFavorites(newFavorites);
    };

    const removeFavorite = async (movie: Movie) => {
        await removeMovie(movie)
        const newFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
        setFavorites(newFavorites);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favorites.map((movie) => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        onRemoveToFavourites={removeFavorite}
                        onAddToFavorites={addToFavorite}
                        isFavorite={true}
                    />
                ))}
            </div>
        </div>
    );
}

