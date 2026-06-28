const BASE_URL = 'https://saavn.sumit.co/api';

export interface SearchResult {
  id: string;
  name: string;
  artists: string;
  album: string;
  duration: number;
  image: string;
  downloadUrl: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    results: Array<{
      id: string;
      name: string;
      album: {name: string};
      artists: {primary: Array<{name: string}>};
      duration: number;
      image: Array<{quality: string; url: string}>;
      downloadUrl: Array<{quality: string; url: string}>;
    }>;
  };
}

export async function searchSongs(query: string): Promise<SearchResult[]> {
  const response = await fetch(
    `${BASE_URL}/search/songs?query=${encodeURIComponent(query)}`,
  );
  const json: ApiResponse = await response.json();

  if (!json.success || !json.data?.results) {
    return [];
  }

  return json.data.results.map(item => ({
    id: item.id,
    name: item.name,
    artists: item.artists.primary.map(a => a.name).join(', '),
    album: item.album.name,
    duration: item.duration,
    image: item.image.find(i => i.quality === '500x500')?.url ?? '',
    downloadUrl:
      item.downloadUrl.find(d => d.quality === '320kbps')?.url ?? '',
  }));
}
