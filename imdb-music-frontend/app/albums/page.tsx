import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchSongsByAlbum } from '../../utils/api';

interface Song {
  id: string;
  title: string;
  duration: number;
}


export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: songs, isLoading, error } = useQuery<Song[]>({
    queryKey: ['songs', id], 
    queryFn: () => fetchSongsByAlbum(id),
    enabled: !!id,  // Prevents query from running until id is available
  });
  
  if (!id) return <p>Loading album...</p>; // Show loading until id is available
  if (isLoading) return <p>Loading songs...</p>;
  if (error) return <p>Error loading songs.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Songs</h1>
      <ul>
        {songs?.map((song) => ( // Ensure `songs` exists before mapping
          <li key={song.id} className="mb-2">
            {song.title} ({song.duration} sec)
          </li>
        ))}
      </ul>
    </div>
  );
}


