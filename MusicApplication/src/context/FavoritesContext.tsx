import React, {createContext, useContext, useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {PlaylistSong} from './PlaylistContext';

const STORAGE_KEY = '@favorites';

interface FavoritesContextType {
  favorites: PlaylistSong[];
  toggleFavorite: (song: PlaylistSong) => void;
  isFavorite: (songId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({children}: {children: React.ReactNode}) {
  const [favorites, setFavorites] = useState<PlaylistSong[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(json => {
      if (json) {
        setFavorites(JSON.parse(json));
      }
    });
  }, []);

  const save = useCallback(async (updated: PlaylistSong[]) => {
    setFavorites(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const toggleFavorite = useCallback(
    (song: PlaylistSong) => {
      const exists = favorites.find(s => s.id === song.id);
      if (exists) {
        save(favorites.filter(s => s.id !== song.id));
      } else {
        save([...favorites, song]);
      }
    },
    [favorites, save],
  );

  const isFavorite = useCallback(
    (songId: string) => {
      return favorites.some(s => s.id === songId);
    },
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={{favorites, toggleFavorite, isFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
