import {View, Text, TextInput, FlatList, Image, Pressable, Alert} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSearch} from '../context/SearchContext';
import {useTheme} from '../context/ThemeContext';
import {useAudioPlayer} from '../context/AudioPlayerContext';
import {usePlaylist} from '../context/PlaylistContext';
import {useFavorites} from '../context/FavoritesContext';
import {spacing, radius, typography} from '../constants/theme';
import type {RootStackParamList} from '../navigation/navigation';

export default function SearchScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {query, results, loading, setQuery, search} = useSearch();
  const {colors} = useTheme();
  const {loadTrack} = useAudioPlayer();
  const {playlists, addSong} = usePlaylist();
  const {toggleFavorite, isFavorite} = useFavorites();

  const handlePlay = (item: {name: string; artists: string; downloadUrl: string; image: string; duration: number}) => {
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
      <TextInput
        placeholder="Search songs..."
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={search}
        returnKeyType="search"
        style={{
          backgroundColor: colors.surface,
          color: colors.text,
          padding: spacing.md,
          borderRadius: radius.md,
          fontSize: typography.body,
        }}
      />

      {loading && <Text style={{color: colors.textSecondary, marginTop: spacing.md}}>Searching...</Text>}

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        contentContainerStyle={{marginTop: spacing.md}}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handlePlay(item)}
            onLongPress={() => {
              if (playlists.length === 0) {
                Alert.alert('No playlists', 'Create a playlist first');
                return;
              }
              Alert.alert('Add to Playlist', item.name, [
                ...playlists.map(p => ({
                  text: p.name,
                  onPress: () =>
                    addSong(p.id, {
                      id: item.id,
                      name: item.name,
                      artists: item.artists,
                      image: item.image,
                      downloadUrl: item.downloadUrl,
                      duration: item.duration,
                    }),
                })),
                {text: 'Cancel', style: 'cancel'},
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
              <Text style={{color: colors.text, fontSize: typography.body, fontWeight: '600'}}>
                {item.name}
              </Text>
              <Text style={{color: colors.textSecondary, fontSize: typography.caption}}>
                {item.artists}
              </Text>
            </View>
            <Pressable
              onPress={() =>
                toggleFavorite({
                  id: item.id,
                  name: item.name,
                  artists: item.artists,
                  image: item.image,
                  downloadUrl: item.downloadUrl,
                  duration: item.duration,
                })
              }
              style={{padding: spacing.sm}}>
              <Text style={{fontSize: 22}}>
                {isFavorite(item.id) ? '❤️' : '🤍'}
              </Text>
            </Pressable>
          </Pressable>
        )}
        ListEmptyComponent={
          !loading && query.trim() !== '' ? (
            <Text style={{color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl}}>
              No results found
            </Text>
          ) : null
        }
      />
    </View>
  );
}
