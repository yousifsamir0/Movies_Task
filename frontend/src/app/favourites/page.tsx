'use client';

import { useState, useEffect } from 'react';

import { Movie } from '../../types';
import { MovieCard } from '@/components/movie-card';
import { createMovie, getMovies, removeMovie, updateMovie } from '@/lib/api';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [editMovie, setEditMovie] = useState<Movie | null>(null);
    const [open, setOpen] = useState<boolean>(false);

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

    const handleUpdateMovie = async () => {
        if (editMovie) {

            await updateMovie(editMovie);
            const newFavourites = favorites.map((m: Movie, i: number) => {
                if (m.imdbID === editMovie.imdbID)
                    return editMovie
                return m;
            });
            setFavorites(newFavourites);
        }
        setOpen(false);


    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit you favourite Movie: </DialogTitle>
                    <DialogDescription>
                        Make changes to your Movie here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                {editMovie &&

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input id="title" defaultValue={editMovie.Title} className="col-span-3"
                                onChange={(e) => { setEditMovie({ ...editMovie, Title: e.target.value }) }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Year
                            </Label>
                            <Input id="year" defaultValue={editMovie.Year} className="col-span-3"
                                onChange={(e) => { setEditMovie({ ...editMovie, Year: e.target.value }) }}
                            />
                        </div>
                    </div>
                }
                <DialogFooter>
                    <Button type="submit" onClick={() => handleUpdateMovie()}>Save changes</Button>
                </DialogFooter>
            </DialogContent>


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
                            setEditMovie={(m: Movie) => { setEditMovie(m); }}
                        />
                    ))}
                </div>
            </div>
        </Dialog>
    );
}

