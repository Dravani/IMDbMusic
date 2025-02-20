import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query'; // ✅ Use updated import
import { fetchAlbumsByArtist } from '../../utils/api';
import Link from 'next/link';

// ✅ Define TypeScript Interface for Albums
interface Album {
  id: string;
  title: string;
}

export default function ArtistPage() {
  const router = useRouter();
  const { id } = router.query;

  // ✅ Prevent the query from running until `id` is available
  const { data: albums, isLoading, error } = useQuery<Album[]>({
    queryKey: ['albums', id],
    queryFn: () => fetchAlbumsByArtist(id),
    enabled: !!id, // ✅ Ensures query only runs when `id` exists
  });

  if (!id) return <p>Loading artist...</p>; // ✅ Prevents errors when `id` is undefined
  if (isLoading) return <p>Loading albums...</p>;
  if (error) return <p>Error loading albums.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Albums</h1>
      <ul>
        {albums?.map((album) => (
          <li key={album.id} className="mb-2">
            <Link href={`/albums/${album.id}`} className="text-blue-400 hover:underline">
              {album.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
