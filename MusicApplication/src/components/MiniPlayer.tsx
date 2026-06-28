import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAudioPlayer} from '../context/AudioPlayerContext';
import {useTheme} from '../context/ThemeContext';
import {spacing, radius, typography} from '../constants/theme';
import type {RootStackParamList} from '../navigation/navigation';

export default function MiniPlayer() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {currentTrack, isPlaying, togglePlayPause} = useAudioPlayer();
  const {colors} = useTheme();

  if (!currentTrack) {
    return null;
  }

  return (
    <Pressable
      onPress={() => navigation.navigate('NowPlaying')}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}>
      {currentTrack.artworkUrl ? (
        <Image
          source={{uri: currentTrack.artworkUrl as string}}
          style={{width: 40, height: 40, borderRadius: radius.sm}}
        />
      ) : (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: radius.sm,
            backgroundColor: colors.border,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: colors.textSecondary}}>♪</Text>
        </View>
      )}
      <View style={{flex: 1, marginLeft: spacing.md}}>
        <Text
          style={{color: colors.text, fontSize: typography.body, fontWeight: '600'}}
          numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text
          style={{color: colors.textSecondary, fontSize: typography.caption}}
          numberOfLines={1}>
          {currentTrack.artist}
        </Text>
      </View>
      <Pressable onPress={togglePlayPause} style={{padding: spacing.sm}}>
        <Text style={{color: colors.primary, fontSize: 24}}>
          {isPlaying ? '⏸' : '▶'}
        </Text>
      </Pressable>
    </Pressable>
  );
}
