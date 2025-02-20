"use client"; // ✅ This ensures the component runs on the client side

import { useQuery } from '@tanstack/react-query';
import { fetchArtists } from '../utils/api';
import Link from 'next/link';

// ✅ Define TypeScript Interface for Artists
interface Artist {
  id: string;
  name: string;
}

export default function Home() {
  const { data: artists, isLoading, error } = useQuery<Artist[]>({
    queryKey: ['artists'],
    queryFn: fetchArtists,
  });

  if (isLoading) return <p>Loading artists...</p>;
  if (error) return <p>Error loading artists.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">IMDb for Music 🎵</h1>
      <ul>
        {artists?.map((artist) => (
          <li key={artist.id} className="mb-2">
            <Link href={`/artists/${artist.id}`} className="text-blue-400 hover:underline">
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
