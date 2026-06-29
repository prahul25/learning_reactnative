import {View, Text, FlatList, Pressable, Image, Alert} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAudioPlayer} from '../context/AudioPlayerContext';
import {useTheme} from '../context/ThemeContext';
import {spacing, radius, typography} from '../constants/theme';
import type {RootStackParamList} from '../navigation/navigation';

export default function QueueScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    queue,
    currentIndex,
    skipToIndex,
    removeFromQueue,
    moveInQueue,
    clearQueue,
  } = useAudioPlayer();
  const {colors} = useTheme();

  const handleRemove = (index: number) => {
    Alert.alert('Remove from Queue', 'Remove this track?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removeFromQueue(index),
      },
    ]);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background, padding: spacing.md}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md}}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{color: colors.primary, fontSize: typography.body}}>← Back</Text>
        </Pressable>
        <Text style={{color: colors.text, fontSize: typography.title, fontWeight: '700'}}>
          Queue
        </Text>
        <Pressable
          onPress={() => {
            Alert.alert('Clear Queue', 'Remove all tracks?', [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Clear',
                style: 'destructive',
                onPress: clearQueue,
              },
            ]);
          }}>
          <Text style={{color: colors.accent, fontSize: typography.body}}>Clear</Text>
        </Pressable>
      </View>

      {queue.length === 0 ? (
        <Text style={{color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl}}>
          Queue is empty
        </Text>
      ) : (
        <FlatList
          data={queue}
          keyExtractor={(item, index) => `${item.mediaId ?? index}`}
          renderItem={({item, index}) => {
            const isCurrent = index === currentIndex;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: spacing.sm,
                  backgroundColor: isCurrent ? colors.primary + '20' : colors.surface,
                  borderRadius: radius.md,
                  marginBottom: spacing.sm,
                }}>
                <Image
                  source={{
                    uri:
                      typeof item.artworkUrl === 'string'
                        ? item.artworkUrl
                        : undefined,
                  }}
                  style={{width: 45, height: 45, borderRadius: radius.sm}}
                />
                <Pressable
                  onPress={() => {
                    skipToIndex(index);
                    navigation.navigate('NowPlaying');
                  }}
                  style={{flex: 1, marginLeft: spacing.md}}>
                  <Text
                    style={{
                      color: isCurrent ? colors.primary : colors.text,
                      fontSize: typography.body,
                      fontWeight: '600',
                    }}
                    numberOfLines={1}>
                    {item.title ?? 'Unknown'}
                  </Text>
                  <Text
                    style={{
                      color: colors.textSecondary,
                      fontSize: typography.caption,
                    }}
                    numberOfLines={1}>
                    {item.artist ?? ''} {isCurrent ? '• Now Playing' : ''}
                  </Text>
                </Pressable>
                <View style={{flexDirection: 'row'}}>
                  {index > 0 && (
                    <Pressable
                      onPress={() => moveInQueue(index, index - 1)}
                      style={{padding: spacing.xs}}>
                      <Text style={{color: colors.textSecondary, fontSize: 18}}>↑</Text>
                    </Pressable>
                  )}
                  {index < queue.length - 1 && (
                    <Pressable
                      onPress={() => moveInQueue(index, index + 1)}
                      style={{padding: spacing.xs}}>
                      <Text style={{color: colors.textSecondary, fontSize: 18}}>↓</Text>
                    </Pressable>
                  )}
                  <Pressable
                    onPress={() => handleRemove(index)}
                    style={{padding: spacing.xs}}>
                    <Text style={{color: colors.accent, fontSize: 18}}>✕</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
