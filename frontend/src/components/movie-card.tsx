import Image from 'next/image';
import { Movie } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface MovieCardProps {
    movie: Movie;
    onAddToFavorites: (movie: Movie) => void;
    isFavorite: boolean;
}

export function MovieCard({ movie, onAddToFavorites, isFavorite }: MovieCardProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="line-clamp-1">{movie.Title}</CardTitle>
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
                    onClick={() => onAddToFavorites(movie)}
                    variant={isFavorite ? "secondary" : "default"}
                    className="w-full"
                >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </CardFooter>
        </Card>
    );
}

