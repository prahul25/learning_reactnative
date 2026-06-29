import {View, Text, Pressable, Switch, Alert, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '../context/ThemeContext';
import {usePlaylist} from '../context/PlaylistContext';
import {useFavorites} from '../context/FavoritesContext';
import {useDownloads} from '../context/DownloadContext';
import {spacing, radius, typography} from '../constants/theme';

export default function SettingsScreen() {
  const {mode, colors, toggleTheme} = useTheme();
  const {playlists} = usePlaylist();
  const {favorites} = useFavorites();
  const {downloads, deleteDownload} = useDownloads();

  const doneDownloads = downloads.filter(d => d.status === 'done');

  const clearAllDownloads = () => {
    Alert.alert('Clear Downloads', 'Delete all downloaded songs?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Clear All',
        style: 'destructive',
        onPress: () => doneDownloads.forEach(s => deleteDownload(s.id)),
      },
    ]);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
      <View style={{padding: spacing.md}}>
        <Text
          style={{
            color: colors.text,
            fontSize: typography.title,
            fontWeight: '700',
            marginBottom: spacing.lg,
          }}>
          Settings
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: typography.caption,
            marginBottom: spacing.sm,
          }}>
          APPEARANCE
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing.md,
            backgroundColor: colors.surface,
            borderRadius: radius.md,
            marginBottom: spacing.md,
          }}>
          <Text style={{color: colors.text, fontSize: typography.body}}>
            Dark Mode
          </Text>
          <Switch
            value={mode === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{false: colors.border, true: colors.primary}}
            thumbColor="#FFF"
          />
        </View>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: typography.caption,
            marginBottom: spacing.sm,
            marginTop: spacing.lg,
          }}>
          STORAGE
        </Text>
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: radius.md,
            marginBottom: spacing.md,
          }}>
          <Row label="Playlists" value={playlists.length} colors={colors} />
          <Row label="Favorites" value={favorites.length} colors={colors} />
          <Row
            label="Downloads"
            value={`${doneDownloads.length} songs`}
            colors={colors}
          />
        </View>

        {doneDownloads.length > 0 && (
          <Pressable
            onPress={clearAllDownloads}
            style={{
              padding: spacing.md,
              backgroundColor: colors.surface,
              borderRadius: radius.md,
              alignItems: 'center',
              marginBottom: spacing.md,
            }}>
            <Text style={{color: colors.accent, fontSize: typography.body, fontWeight: '600'}}>
              Clear All Downloads
            </Text>
          </Pressable>
        )}

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: typography.caption,
            marginBottom: spacing.sm,
            marginTop: spacing.lg,
          }}>
          ABOUT
        </Text>
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: radius.md,
            marginBottom: spacing.md,
          }}>
          <Row label="App" value="MusicApplication" colors={colors} last />
        </View>
      </View>
    </ScrollView>
  );
}

function Row({
  label,
  value,
  colors,
  last,
}: {
  label: string;
  value: string | number;
  colors: any;
  last?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.border,
      }}>
      <Text style={{color: colors.text, fontSize: typography.body}}>{label}</Text>
      <Text style={{color: colors.textSecondary, fontSize: typography.body}}>
        {value}
      </Text>
    </View>
  );
}