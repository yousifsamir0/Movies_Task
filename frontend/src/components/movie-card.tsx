import Image from 'next/image';
import { Movie } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogTrigger } from './ui/dialog';

interface MovieCardProps {
    movie: Movie;
    onAddToFavorites: (movie: Movie) => void;
    onRemoveToFavourites: (movie: Movie) => void;
    isFavorite: boolean;
    setEditMovie?: (movie: Movie) => void;
}

export function MovieCard({ movie, onAddToFavorites, onRemoveToFavourites, setEditMovie, isFavorite }: MovieCardProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="line-clamp-1">{movie.Title}</CardTitle>
                {setEditMovie && <DialogTrigger onClick={() => setEditMovie(movie)}>Edit Movie</DialogTrigger>}
            </CardHeader>
            <CardContent>
                <div className="relative aspect-[2/3] w-full">
                    <Image
                        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                        alt={movie.Title}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
                <p className="mt-2 text-sm text-gray-500">Year: {movie.Year}</p>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => {
                        (isFavorite) ? onRemoveToFavourites(movie) : onAddToFavorites(movie);
                    }}
                    variant={isFavorite ? "secondary" : "default"}
                    className="w-full"
                >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </CardFooter>
        </Card>
    );
}

