import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAudioPlayer} from '../context/AudioPlayerContext';
import {usePlaylist} from '../context/PlaylistContext';
import {useFavorites} from '../context/FavoritesContext';
import {useDownloads} from '../context/DownloadContext';
import {useTheme} from '../context/ThemeContext';
import {spacing, radius, typography} from '../constants/theme';
import type {RootStackParamList} from '../navigation/navigation';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {currentTrack} = useAudioPlayer();
  const {playlists} = usePlaylist();
  const {favorites} = useFavorites();
  const {downloads} = useDownloads();
  const {colors} = useTheme();

  const doneDownloads = downloads.filter(d => d.status === 'done');

  return (
    <View style={{flex: 1, backgroundColor: colors.background, padding: spacing.md}}>
      <Text
        style={{
          color: colors.text,
          fontSize: typography.title,
          fontWeight: '700',
          marginBottom: spacing.lg,
        }}>
        MusicApp
      </Text>

      {currentTrack && (
        <Pressable
          onPress={() => navigation.navigate('NowPlaying')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: spacing.md,
            backgroundColor: colors.surface,
            borderRadius: radius.md,
            marginBottom: spacing.lg,
            borderWidth: 1,
            borderColor: colors.primary,
          }}>
          <Text style={{fontSize: 32, marginRight: spacing.md}}>▶</Text>
          <View style={{flex: 1}}>
            <Text style={{color: colors.primary, fontSize: typography.caption, marginBottom: spacing.xs}}>
              NOW PLAYING
            </Text>
            <Text style={{color: colors.text, fontSize: typography.body, fontWeight: '600'}} numberOfLines={1}>
              {currentTrack.title}
            </Text>
            <Text style={{color: colors.textSecondary, fontSize: typography.caption}} numberOfLines={1}>
              {currentTrack.artist}
            </Text>
          </View>
          <Text style={{color: colors.textSecondary, fontSize: 20}}>›</Text>
        </Pressable>
      )}

      <Text style={{color: colors.textSecondary, fontSize: typography.caption, marginBottom: spacing.sm}}>
        QUICK LINKS
      </Text>

      <QuickLink
        label="Search Songs"
        icon="🔍"
        onPress={() => navigation.navigate('MainTabs')}
        colors={colors}
      />
      <QuickLink
        label="Library"
        icon="📚"
        onPress={() => navigation.navigate('MainTabs')}
        colors={colors}
      />
      <QuickLink
        label="Favorites"
        icon="♥"
        value={`${favorites.length} songs`}
        onPress={() => navigation.navigate('Favorites')}
        colors={colors}
      />
      <QuickLink
        label="Downloads"
        icon="⬇"
        value={`${doneDownloads.length} songs`}
        onPress={() => navigation.navigate('Downloads')}
        colors={colors}
      />

      <Text style={{color: colors.textSecondary, fontSize: typography.caption, marginBottom: spacing.sm, marginTop: spacing.md}}>
        STATS
      </Text>
      <View style={{flexDirection: 'row', gap: spacing.sm}}>
        <StatBox label="Playlists" value={playlists.length} colors={colors} />
        <StatBox label="Favorites" value={favorites.length} colors={colors} />
        <StatBox label="Downloads" value={doneDownloads.length} colors={colors} />
      </View>
    </View>
  );
}

function QuickLink({
  label,
  icon,
  value,
  onPress,
  colors,
}: {
  label: string;
  icon: string;
  value?: string;
  onPress: () => void;
  colors: any;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        marginBottom: spacing.sm,
      }}>
      <Text style={{fontSize: 22, marginRight: spacing.md}}>{icon}</Text>
      <Text style={{color: colors.text, fontSize: typography.body, flex: 1}}>
        {label}
      </Text>
      {value && (
        <Text style={{color: colors.textSecondary, fontSize: typography.caption, marginRight: spacing.sm}}>
          {value}
        </Text>
      )}
      <Text style={{color: colors.textSecondary, fontSize: 18}}>›</Text>
    </Pressable>
  );
}

function StatBox({
  label,
  value,
  colors,
}: {
  label: string;
  value: number;
  colors: any;
}) {
  return (
    <View
      style={{
        flex: 1,
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        alignItems: 'center',
      }}>
      <Text style={{color: colors.text, fontSize: typography.title, fontWeight: '700'}}>
        {value}
      </Text>
      <Text style={{color: colors.textSecondary, fontSize: typography.caption, marginTop: spacing.xs}}>
        {label}
      </Text>
    </View>
  );
}