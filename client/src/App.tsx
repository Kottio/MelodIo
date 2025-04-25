import { useState, useRef, useEffect } from 'react'
import Meyda from 'meyda';
import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';
import './App.css'
import MusicNotation from './MusicSheet';

function App() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaSourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const analyzerRef = useRef<MeydaAnalyzer | null>(null)
  // const [lastNote, setLastNote] = useState('')
  const lastNoteRef = useRef<string | null>(null);
  const consecutiveNoteCount = useRef(0);
  const [melody, setMelody] = useState<string[]>(['B', 'F', 'C#', 'A']);
  const [harmonization, setHarmonization] = useState()

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream

      // const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const mediaSource = audioContext.createMediaStreamSource(stream);
      mediaSourceRef.current = mediaSource;

      console.log('🎙️ Audio is recording')

      const notes: string[] = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']


      const analyzer = Meyda.createMeydaAnalyzer({

        audioContext: audioContextRef.current,
        source: mediaSourceRef.current,
        bufferSize: 512,
        featureExtractors: ["chroma"],

        callback: (features: any) => {

          let currentNote = notes[features.chroma.indexOf(Math.max(...features.chroma))]
          if (currentNote == lastNoteRef.current) {
            consecutiveNoteCount.current++


          } else {
            lastNoteRef.current = currentNote
            consecutiveNoteCount.current = 1
          }

          if (consecutiveNoteCount.current == 30) {
            console.log('current Note', currentNote)
            console.log('consecutive Notes', consecutiveNoteCount.current)
            setMelody(prev_melody => [...prev_melody, currentNote])


          }
          else { return }

        },
      })

      analyzer.start()
      analyzerRef.current = analyzer;

    } catch (err) {
      console.error("🔇 Cannot access the mic"), err
    }
  }

  const stopRecording = function () {
    if (!audioContextRef.current || !mediaSourceRef.current || !mediaStreamRef.current) { return }

    audioContextRef.current.close()
    audioContextRef.current = null;

    mediaStreamRef.current.getTracks().forEach(track => track.stop());
    mediaStreamRef.current = null

    mediaSourceRef.current = null;

    analyzerRef.current?.stop()
    analyzerRef.current = null

    lastNoteRef.current = null;
    consecutiveNoteCount.current = 0;


    console.log("🔇 Audio Stopped recording")
  }

  const llmAnalzye = async function (melody: string[], style: string, level: string) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        melody, style, level
      })
    }
    const response = await fetch("http://localhost:8080/llmAnalyze", options)
    if (response) {
      const data = await response.json()
      console.log(data)
      setHarmonization(data)
    }
  }


  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center gap-1.5'>
        <button className='bg-white p-5 text-black rounded-2xl' onClick={startRecording}>StartRecording</button>
        <button className='bg-white p-5 text-black rounded-2xl' onClick={stopRecording} >Stop Recording</button>
        <div className='bg-blue-300 p-10 rounded-2xl mt-3'>
          <p className='text-4xl font-bold text-blue-800'>{melody.join('  ')}</p>
        </div>
        {/* <div className="bg-white flex justify-center"><MusicNotation melody={melody} /></div> */}
        <button className='bg-white p-5 text-black rounded-2xl' onClick={() => { llmAnalzye(melody, 'Bossa Nova', 'Advanced') }} >Analyze with AI</button>
        {/* Disabled when audio did not stop recordin */}

      </div>
    </>
  )
}

export default App
