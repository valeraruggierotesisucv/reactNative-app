import { useState } from 'react';
import { Audio } from 'expo-av';
import { IOSOutputFormat } from 'expo-av/build/Audio/RecordingConstants';


export function useAudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioFileUri, setAudioFileUri] = useState<{ nameFile: string; uri: string } | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') return;
      await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        
    const { ios, android, web } = Audio.RecordingOptionsPresets.HIGH_QUALITY
      const { recording } = await Audio.Recording.createAsync({ android: android, ios: { ...ios, extension: '.mp4', outputFormat: IOSOutputFormat.MPEG4AAC } } as Audio.RecordingOptions);
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording?.stopAndUnloadAsync();
      const uri = recording?.getURI();
      setAudioFileUri({ nameFile: 'Recorded Audio', uri: uri || '' });
      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  return {
    audioFileUri,
    startRecording,
    stopRecording,
    isRecording,
  };
} 