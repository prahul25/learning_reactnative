import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {usePlaylist} from '../context/PlaylistContext';
import {useAudioPlayer} from '../context/AudioPlayerContext';
import {useTheme} from '../context/ThemeContext';
import {spacing, radius, typography} from '../constants/theme';
import type {RootStackParamList} from '../navigation/navigation';

export default function PlaylistDetailScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'PlaylistDetail'>>();
  const {playlists, removeSong} = usePlaylist();
  const {loadTrack} = useAudioPlayer();
  const {colors} = useTheme();

  const playlist = playlists.find(p => p.id === route.params.playlistId);

  if (!playlist) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: colors.text}}>Playlist not found</Text>
      </View>
    );
  }

  const handlePlay = (item: (typeof playlist.songs)[0]) => {
    loadTrack({
      url: item.downloadUrl,
      title: item.name,
      artist: item.artists,
      artworkUrl: item.image,
      duration: item.duration,
    });
    navigation.navigate('NowPlaying');
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background, padding: spacing.md}}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{marginBottom: spacing.md}}>
        <Text style={{color: colors.primary, fontSize: typography.body}}>← Back</Text>
      </Pressable>

      <Text
        style={{
          color: colors.text,
          fontSize: typography.title,
          fontWeight: '700',
          marginBottom: spacing.sm,
        }}>
        {playlist.name}
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: typography.body,
          marginBottom: spacing.md,
        }}>
        {playlist.songs.length} songs
      </Text>

      <FlatList
        data={playlist.songs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handlePlay(item)}
            onLongPress={() => {
              Alert.alert('Remove Song', `Remove "${item.name}"?`, [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Remove',
                  style: 'destructive',
                  onPress: () => removeSong(playlist.id, item.id),
                },
              ]);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: spacing.sm,
              backgroundColor: colors.surface,
              borderRadius: radius.md,
              marginBottom: spacing.sm,
            }}>
            <Image
              source={{uri: item.image}}
              style={{width: 50, height: 50, borderRadius: radius.sm}}
            />
            <View style={{marginLeft: spacing.md, flex: 1}}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: typography.body,
                  fontWeight: '600',
                }}
                numberOfLines={1}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: typography.caption,
                }}
                numberOfLines={1}>
                {item.artists}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text
            style={{
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: spacing.xl,
            }}>
            No songs in this playlist
          </Text>
        }
      />
    </View>
  );
}
