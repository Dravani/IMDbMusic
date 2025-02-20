import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Backend API URL

export const fetchArtists = async () => {
  const response = await axios.get(`${API_BASE_URL}/artists`);
  return response.data;
};

export const fetchAlbumsByArtist = async (artistId) => {
  const response = await axios.get(`${API_BASE_URL}/albums/artist/${artistId}`);
  return response.data;
};

export const fetchSongsByAlbum = async (albumId) => {
  const response = await axios.get(`${API_BASE_URL}/songs/album/${albumId}`);
  return response.data;
};
