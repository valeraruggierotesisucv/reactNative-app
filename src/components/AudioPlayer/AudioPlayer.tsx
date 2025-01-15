import { Audio } from "expo-av";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState, useRef } from "react";
import Slider from "@react-native-community/slider";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../../utils/theme";

interface AudioPlayerProps {
  uri: string;
}

export function AudioPlayer({ uri }: AudioPlayerProps) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const { sound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false }
        );

        soundRef.current = sound;
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis || 0);

          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
              setPosition(status.positionMillis);
              setIsPlaying(status.isPlaying);

              if (status.didJustFinish) {
                setPosition(0);
                setIsPlaying(false);
                sound.playFromPositionAsync(0);
                sound.stopAsync();
              }
            }
          });
        }
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    };

    loadAudio();
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, [uri]);

  const togglePlayback = async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  };

  const onSliderValueChange = (value: number) => {
    setPosition(value);
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
        <Feather
          name={isPlaying ? "pause" : "play"}
          size={24}
          color={isPlaying ? theme.colors["secondary"] : theme.colors["black"]}
        />
      </TouchableOpacity>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={onSliderValueChange}
          minimumTrackTintColor={theme.colors["secondary"]}
          maximumTrackTintColor="#b3b3b3"
          thumbTintColor={theme.colors["secondary"]}
          disabled
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
  },
  playButton: {
    padding: 10,
  },
  playButtonText: {
    fontSize: 24,
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
  },
});
