'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MovieCard } from '../components/movie-card';
import { createMovie, getMovies, removeMovie, searchMovies } from '../lib/api';
import { Movie } from '../types';
import Pagination from './pagination';
import { Loader } from 'lucide-react';


export function SearchResults() {
    const searchParams = useSearchParams();
    const s = searchParams.get('s') || '';
    const type = searchParams.get('type') || '';
    const y = searchParams.get('y') || '';
    const page = searchParams.get('page') || '';

    const pathname = usePathname();
    const router = useRouter();


    function getPage(pn: any) {
        // let's assume we want to push the `query` searchParam

        const currentPage = searchParams.get('page')
        const updatedSearchParams = new URLSearchParams(searchParams.toString())
        updatedSearchParams.set("page", pn)
        router.push(pathname + "?" + updatedSearchParams.toString())
    }



    const [movies, setMovies] = useState<Movie[]>([]);
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);



    useEffect(() => {
        (async function () {
            setLoading(true);
            const movies = await getMovies()
            setFavorites(movies);
            setLoading(false);
        })()

    }, []);

    useEffect(() => {
        if (s) {
            searchMovies({ s, y, type, page }).then((data) => {
                console.log(data)
                setMovies(data.Search || [])
                setTotalPages(Math.ceil(parseInt(data.totalResults) / 10));
            }
            );
        }
    }, [searchParams]);


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

    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <Loader className='animate-spin' />
            </div>
        );
    }


    return (
        <div className='flex flex-col gap-6 items-center'>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        onAddToFavorites={addToFavorite}
                        onRemoveToFavourites={removeFavorite}
                        isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                    />
                ))}
            </div>
            {(totalPages > 1) &&
                <Pagination
                    currentPage={parseInt(page) || 1}
                    fetchPage={getPage}
                    totalPages={totalPages}

                />
            }
        </div>
    );
}

