import {View, Text, FlatList, Image, Pressable, Alert} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDownloads} from '../context/DownloadContext';
import {useAudioPlayer} from '../context/AudioPlayerContext';
import {useTheme} from '../context/ThemeContext';
import {spacing, radius, typography} from '../constants/theme';
import type {RootStackParamList} from '../navigation/navigation';

export default function DownloadsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {downloads, deleteDownload} = useDownloads();
  const {loadTrack} = useAudioPlayer();
  const {colors} = useTheme();

  const doneDownloads = downloads.filter(d => d.status === 'done');

  const handlePlay = (item: (typeof doneDownloads)[0]) => {
    loadTrack({
      url: item.localPath,
      title: item.name,
      artist: item.artists,
      artworkUrl: item.image,
      duration: item.duration,
    });
    navigation.navigate('NowPlaying');
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background, padding: spacing.md}}>
      <Text
        style={{
          color: colors.text,
          fontSize: typography.title,
          fontWeight: '700',
          marginBottom: spacing.md,
        }}>
        Downloads
      </Text>

      <FlatList
        data={doneDownloads}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handlePlay(item)}
            onLongPress={() => {
              Alert.alert('Delete Download', `Delete "${item.name}"?`, [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => deleteDownload(item.id),
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
            <Text style={{color: colors.textSecondary, fontSize: typography.caption}}>
              ✓ Offline
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text
            style={{
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: spacing.xl,
            }}>
            No downloads yet. Tap ⬇ on any song to save offline.
          </Text>
        }
      />
    </View>
  );
}
