
import { Input } from '@/components/ui/input';
import { SearchResults } from '@/components/search-results';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Search</h1>
      <form className="flex gap-2 mb-4">
        <Input type="search" name="s" placeholder="Search for movies..." />
        <Input type="number" name="y" placeholder="Filter by year (e.g., 2023)" min="1888" max={new Date().getFullYear()} />
        <Select name="type">
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="">Any type</SelectItem> */}
            <SelectItem value="movie">Movie</SelectItem>
            <SelectItem value="series">Series</SelectItem>
            <SelectItem value="episode">Episode</SelectItem>
          </SelectContent>
        </Select>
        <Button className='flex justify-around' type='submit'>Search <Search /></Button>
      </form>
      <SearchResults />
    </div>
  );
}

