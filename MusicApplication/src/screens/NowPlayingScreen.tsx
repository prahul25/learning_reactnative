import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAudioPlayer} from '../context/AudioPlayerContext';
import {useTheme} from '../context/ThemeContext';
import {spacing, radius, typography} from '../constants/theme';

const {width} = Dimensions.get('window');
const ARTWORK_SIZE = width - spacing.md * 4;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function NowPlayingScreen() {
  const navigation = useNavigation();
  const {
    isPlaying,
    currentTrack,
    position,
    duration,
    togglePlayPause,
    seekTo,
    skipToNext,
    skipToPrevious,
  } = useAudioPlayer();
  const {colors} = useTheme();

  const progress = duration > 0 ? position / duration : 0;

  const handleSeek = (event: {nativeEvent: {locationX: number}}) => {
    const barWidth = width - spacing.md * 4;
    const ratio = event.nativeEvent.locationX / barWidth;
    seekTo(ratio * duration);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={{color: colors.text, fontSize: 24}}>▼</Text>
      </Pressable>

      <View style={styles.artworkContainer}>
        {currentTrack?.artworkUrl ? (
          <Image
            source={{uri: currentTrack.artworkUrl as string}}
            style={styles.artwork}
          />
        ) : (
          <View
            style={[
              styles.artwork,
              {backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={{color: colors.textSecondary, fontSize: 40}}>♪</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={[styles.title, {color: colors.text}]}
          numberOfLines={1}>
          {currentTrack?.title ?? 'No track selected'}
        </Text>
        <Text
          style={[styles.artist, {color: colors.textSecondary}]}
          numberOfLines={1}>
          {currentTrack?.artist ?? ''}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <Pressable
          onPress={handleSeek}
          style={[styles.progressBar, {backgroundColor: colors.border}]}>
          <View
            style={[
              styles.progressFill,
              {width: `${progress * 100}%`, backgroundColor: colors.primary},
            ]}
          />
        </Pressable>
        <View style={styles.timeRow}>
          <Text style={[styles.time, {color: colors.textSecondary}]}>
            {formatTime(position)}
          </Text>
          <Text style={[styles.time, {color: colors.textSecondary}]}>
            {formatTime(duration)}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable>
          <Text style={[styles.controlIcon, {color: colors.text}]}>🔀</Text>
        </Pressable>
        <Pressable onPress={skipToPrevious}>
          <Text style={[styles.controlIcon, {color: colors.text}]}>⏮</Text>
        </Pressable>
        <Pressable
          onPress={togglePlayPause}
          style={[styles.playButton, {backgroundColor: colors.primary}]}>
          <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        </Pressable>
        <Pressable onPress={skipToNext}>
          <Text style={[styles.controlIcon, {color: colors.text}]}>⏭</Text>
        </Pressable>
        <Pressable>
          <Text style={[styles.controlIcon, {color: colors.text}]}>🔁</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: 60,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: spacing.sm,
  },
  artworkContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  artwork: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
    borderRadius: radius.xl,
  },
  infoContainer: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  artist: {
    fontSize: typography.subtitle,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: spacing.lg,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  time: {
    fontSize: typography.caption,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: spacing.xl,
  },
  controlIcon: {
    fontSize: 28,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 28,
    color: '#FFFFFF',
  },
});
