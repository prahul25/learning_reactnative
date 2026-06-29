import React, {createContext, useContext, useState, useCallback, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import type {PlaylistSong} from './PlaylistContext';

const STORAGE_KEY = '@downloads';

type DownloadStatus = 'idle' | 'downloading' | 'done' | 'error';

interface DownloadItem extends PlaylistSong {
  localPath: string;
  status: DownloadStatus;
}

interface DownloadContextType {
  downloads: DownloadItem[];
  downloadSong: (song: PlaylistSong) => Promise<void>;
  deleteDownload: (songId: string) => void;
  getStatus: (songId: string) => DownloadStatus;
  isDownloaded: (songId: string) => boolean;
}

const DownloadContext = createContext<DownloadContextType | undefined>(
  undefined,
);

function getFileName(url: string): string {
  const ext = url.endsWith('.mp4') ? '.mp4' : '.mp3';
  return `music_${Date.now()}_${Math.random().toString(36).slice(2, 6)}${ext}`;
}

export function DownloadProvider({children}: {children: React.ReactNode}) {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(json => {
      if (json) {
        setDownloads(JSON.parse(json));
      }
    });
  }, []);

  const save = useCallback(async (updated: DownloadItem[]) => {
    setDownloads(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const downloadSong = useCallback(
    async (song: PlaylistSong) => {
      const existing = downloads.find(s => s.id === song.id);
      if (existing?.status === 'done') return;

      const fileName = getFileName(song.downloadUrl);
      const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const updated: DownloadItem = {...song, localPath, status: 'downloading'};
      save([...downloads.filter(s => s.id !== song.id), updated]);

      try {
        const result = await RNFS.downloadFile({
          fromUrl: song.downloadUrl,
          toFile: localPath,
        }).promise;

        if (result.statusCode === 200) {
          save([
            ...downloads.filter(s => s.id !== song.id),
            {...song, localPath, status: 'done'},
          ]);
        } else {
          save([
            ...downloads.filter(s => s.id !== song.id),
            {...song, localPath, status: 'error'},
          ]);
        }
      } catch {
        save([
          ...downloads.filter(s => s.id !== song.id),
          {...song, localPath, status: 'error'},
        ]);
      }
    },
    [downloads, save],
  );

  const deleteDownload = useCallback(
    async (songId: string) => {
      const item = downloads.find(s => s.id === songId);
      if (item?.localPath) {
        try {
          await RNFS.unlink(item.localPath);
        } catch {}
      }
      save(downloads.filter(s => s.id !== songId));
    },
    [downloads, save],
  );

  const getStatus = useCallback(
    (songId: string): DownloadStatus => {
      return downloads.find(s => s.id === songId)?.status ?? 'idle';
    },
    [downloads],
  );

  const isDownloaded = useCallback(
    (songId: string): boolean => {
      return downloads.some(s => s.id === songId && s.status === 'done');
    },
    [downloads],
  );

  return (
    <DownloadContext.Provider
      value={{downloads, downloadSong, deleteDownload, getStatus, isDownloaded}}>
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownloads() {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownloads must be used within a DownloadProvider');
  }
  return context;
}
