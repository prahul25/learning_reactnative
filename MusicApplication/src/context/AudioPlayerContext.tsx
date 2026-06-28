import TrackPlayer, { MediaItem, useActiveMediaItem, useIsPlaying, useProgress } from "@rntp/player";
import { createContext, useContext, useEffect, useMemo } from "react";


interface AudioPlayerContextType {
    isPlaying: boolean;
    currentTrack: MediaItem | null;
    position: number;
    duration: number;
    play:() => void;
    pause:() => void;
    togglePlayPause:() => void;
    seekTo: (seconds: number) => void;
    skipToNext:() => void;
    skipToPrevious:() => void;
    loadTrack: (mediaItem: MediaItem) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
    undefined
)

export function AudioPlayerProvider({children}:{children: React.ReactNode}){
    useEffect(() =>{
        TrackPlayer.setupPlayer()
    },[])

    const isPlaying = useIsPlaying();
    const {position, duration} = useProgress();
    const currentTrack = useActiveMediaItem()

    const value = useMemo(
        () => ({
            isPlaying,
            currentTrack,
            position,
            duration,
            play: TrackPlayer.play,
            pause: TrackPlayer.pause,
            togglePlayPause: () =>{
                if(isPlaying){
                    TrackPlayer.pause()
                } else {
                    TrackPlayer.play()
                }
            },
            seekTo: TrackPlayer.seekTo,
            skipToNext: TrackPlayer.skipToNext,
            skipToPrevious: TrackPlayer.skipToPrevious,
            loadTrack: (mediaItem: MediaItem) => {
                TrackPlayer.setMediaItem(mediaItem);
                TrackPlayer.play()
            }
        }),
        [isPlaying, currentTrack, position, duration],
    );

    return (
        <AudioPlayerContext.Provider value={value}>
            {children}
        </AudioPlayerContext.Provider>
    )
}

export function useAudioPlayer(){
    const context = useContext(AudioPlayerContext);
    if(!context){
        throw new Error('useAudioPlayer must be used within AudioPlayerProvider')
    }
    return context
}