import React, {createContext, useContext, useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@playlists';

export interface PlaylistSong {
  id: string;
  name: string;
  artists: string;
  image: string;
  downloadUrl: string;
  duration: number;
}

export interface PlaylistData {
  id: string;
  name: string;
  songs: PlaylistSong[];
  createdAt: string;
}

interface PlaylistContextType {
  playlists: PlaylistData[];
  loading: boolean;
  createPlaylist: (name: string) => void;
  deletePlaylist: (id: string) => void;
  renamePlaylist: (id: string, name: string) => void;
  addSong: (playlistId: string, song: PlaylistSong) => void;
  removeSong: (playlistId: string, songId: string) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function PlaylistProvider({children}: {children: React.ReactNode}) {
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(json => {
      if (json) {
        setPlaylists(JSON.parse(json));
      }
      setLoading(false);
    });
  }, []);

  const save = useCallback(async (updated: PlaylistData[]) => {
    setPlaylists(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const createPlaylist = useCallback(
    (name: string) => {
      const newPlaylist: PlaylistData = {
        id: generateId(),
        name,
        songs: [],
        createdAt: new Date().toISOString(),
      };
      save([...playlists, newPlaylist]);
    },
    [playlists, save],
  );

  const deletePlaylist = useCallback(
    (id: string) => {
      save(playlists.filter(p => p.id !== id));
    },
    [playlists, save],
  );

  const renamePlaylist = useCallback(
    (id: string, name: string) => {
      save(playlists.map(p => (p.id === id ? {...p, name} : p)));
    },
    [playlists, save],
  );

  const addSong = useCallback(
    (playlistId: string, song: PlaylistSong) => {
      save(
        playlists.map(p =>
          p.id === playlistId
            ? {...p, songs: [...p.songs, song]}
            : p,
        ),
      );
    },
    [playlists, save],
  );

  const removeSong = useCallback(
    (playlistId: string, songId: string) => {
      save(
        playlists.map(p =>
          p.id === playlistId
            ? {...p, songs: p.songs.filter(s => s.id !== songId)}
            : p,
        ),
      );
    },
    [playlists, save],
  );

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        loading,
        createPlaylist,
        deletePlaylist,
        renamePlaylist,
        addSong,
        removeSong,
      }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
}
