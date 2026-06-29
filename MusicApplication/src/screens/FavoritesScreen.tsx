import {View, Text, FlatList, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFavorites} from '../context/FavoritesContext';
import {useAudioPlayer} from '../context/AudioPlayerContext';
import {useTheme} from '../context/ThemeContext';
import {spacing, radius, typography} from '../constants/theme';
import type {RootStackParamList} from '../navigation/navigation';

export default function FavoritesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {favorites} = useFavorites();
  const {loadTrack} = useAudioPlayer();
  const {colors} = useTheme();

  const handlePlay = (item: (typeof favorites)[0]) => {
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
      <Text
        style={{
          color: colors.text,
          fontSize: typography.title,
          fontWeight: '700',
          marginBottom: spacing.md,
        }}>
        Favorites
      </Text>

      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handlePlay(item)}
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
            No favorites yet. Tap the heart on any song!
          </Text>
        }
      />
    </View>
  );
}
