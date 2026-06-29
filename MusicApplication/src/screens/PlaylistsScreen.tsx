import {View, Text, FlatList, Pressable, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {usePlaylist} from '../context/PlaylistContext';
import {useFavorites} from '../context/FavoritesContext';
import {useAudioPlayer} from '../context/AudioPlayerContext';
import {useTheme} from '../context/ThemeContext';
import {spacing, radius, typography} from '../constants/theme';
import type {RootStackParamList} from '../navigation/navigation';

export default function PlaylistsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {playlists, createPlaylist, deletePlaylist} = usePlaylist();
  const {favorites} = useFavorites();
  const {loadTrack} = useAudioPlayer();
  const {colors} = useTheme();
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCreate = () => {
    if (newName.trim()) {
      createPlaylist(newName.trim());
      setNewName('');
      setShowInput(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background, padding: spacing.md}}>
      {showInput ? (
        <View style={{flexDirection: 'row', marginBottom: spacing.md}}>
          <TextInput
            placeholder="Playlist name"
            placeholderTextColor={colors.textSecondary}
            value={newName}
            onChangeText={setNewName}
            onSubmitEditing={handleCreate}
            style={{
              flex: 1,
              backgroundColor: colors.surface,
              color: colors.text,
              padding: spacing.md,
              borderRadius: radius.md,
              fontSize: typography.body,
            }}
          />
          <Pressable
            onPress={handleCreate}
            style={{
              marginLeft: spacing.sm,
              backgroundColor: colors.primary,
              paddingHorizontal: spacing.md,
              borderRadius: radius.md,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#FFF', fontWeight: '600'}}>Add</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() => setShowInput(true)}
          style={{
            backgroundColor: colors.primary,
            padding: spacing.md,
            borderRadius: radius.md,
            alignItems: 'center',
            marginBottom: spacing.md,
          }}>
          <Text style={{color: '#FFF', fontWeight: '600', fontSize: typography.body}}>
            + New Playlist
          </Text>
        </Pressable>
      )}

      <FlatList
        data={playlists}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <Pressable
            onPress={() => navigation.navigate('Favorites')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: spacing.md,
              backgroundColor: colors.surface,
              borderRadius: radius.md,
              marginBottom: spacing.md,
              borderWidth: 1,
              borderColor: colors.primary,
            }}>
            <View>
              <Text style={{color: colors.text, fontSize: typography.body, fontWeight: '600'}}>
                ♥ Favorites
              </Text>
              <Text style={{color: colors.textSecondary, fontSize: typography.caption}}>
                {favorites.length} songs
              </Text>
            </View>
            <Text style={{color: colors.primary, fontSize: 20}}>›</Text>
          </Pressable>
        }
        renderItem={({item}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('PlaylistDetail', {playlistId: item.id})
            }
            onLongPress={() => {
              Alert.alert('Delete Playlist', `Delete "${item.name}"?`, [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => deletePlaylist(item.id),
                },
              ]);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: spacing.md,
              backgroundColor: colors.surface,
              borderRadius: radius.md,
              marginBottom: spacing.sm,
            }}>
            <View>
              <Text style={{color: colors.text, fontSize: typography.body, fontWeight: '600'}}>
                {item.name}
              </Text>
              <Text style={{color: colors.textSecondary, fontSize: typography.caption}}>
                {item.songs.length} songs
              </Text>
            </View>
            <Text style={{color: colors.textSecondary, fontSize: 20}}>›</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text
            style={{
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: spacing.xl,
            }}>
            No playlists yet. Create one!
          </Text>
        }
      />
    </View>
  );
}
