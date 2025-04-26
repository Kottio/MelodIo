import Meyda from "meyda";
import { MeydaAnalyzer } from "meyda/dist/esm/meyda-wa";
import { useRef, useState } from "react";

export function useMeyda(minNoteLength = 30) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyzerRef = useRef<MeydaAnalyzer | null>(null);
  // const [lastNote, setLastNote] = useState('')
  const lastNoteRef = useRef<string | null>(null);
  const consecutiveNoteCount = useRef(0);
  const [melody, setMelody] = useState<string[]>(["C", "D#", "G", "E", "B"]);

  const startRecording = async () => {
    try {
      setMelody([]);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaStreamRef.current = stream;

      // const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const mediaSource = audioContext.createMediaStreamSource(stream);
      mediaSourceRef.current = mediaSource;

      console.log("🎙️ Audio is recording");

      const notes: string[] = [
        "C",
        "C♯",
        "D",
        "D♯",
        "E",
        "F",
        "F♯",
        "G",
        "G♯",
        "A",
        "A♯",
        "B",
      ];

      const analyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContextRef.current,
        source: mediaSourceRef.current,
        bufferSize: 512,
        featureExtractors: ["chroma"],

        callback: (features: any) => {
          let currentNote =
            notes[features.chroma.indexOf(Math.max(...features.chroma))];
          if (currentNote == lastNoteRef.current) {
            consecutiveNoteCount.current++;
          } else {
            lastNoteRef.current = currentNote;
            consecutiveNoteCount.current = 1;
          }

          if (consecutiveNoteCount.current == minNoteLength) {
            console.log("current Note", currentNote);
            console.log("consecutive Notes", consecutiveNoteCount.current);
            setMelody((prev_melody) => [...prev_melody, currentNote]);
          } else {
            return;
          }
        },
      });

      analyzer.start();
      analyzerRef.current = analyzer;
    } catch (err) {
      console.error("🔇 Cannot access the mic"), err;
    }
  };

  const stopRecording = function () {
    if (
      !audioContextRef.current ||
      !mediaSourceRef.current ||
      !mediaStreamRef.current
    ) {
      return;
    }

    audioContextRef.current.close();
    audioContextRef.current = null;

    mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;

    mediaSourceRef.current = null;

    analyzerRef.current?.stop();
    analyzerRef.current = null;

    lastNoteRef.current = null;
    consecutiveNoteCount.current = 0;

    console.log("🔇 Audio Stopped recording");
  };

  return { startRecording, stopRecording, melody, setMelody };
}
