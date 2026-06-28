import {View, Text, TextInput, FlatList, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSearch} from '../context/SearchContext';
import {useTheme} from '../context/ThemeContext';
import {useAudioPlayer} from '../context/AudioPlayerContext';
import {spacing, radius, typography} from '../constants/theme';
import type {RootStackParamList} from '../navigation/navigation';

export default function SearchScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {query, results, loading, setQuery, search} = useSearch();
  const {colors} = useTheme();
  const {loadTrack} = useAudioPlayer();

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
