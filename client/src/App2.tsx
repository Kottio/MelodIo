import { useEffect, useState } from 'react'
import './App.css'
import { useMeyda } from './hooks/useMeyda'

function App() {

  const { melody, startRecording, stopRecording } = useMeyda()

  const [harmonization, setHarmonization] = useState({
    harmony: [],
    advices: [],
  })
  const [isHarmonized, setIsHarmonized] = useState(false)


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
    if (response.ok) {
      const data = await response.json()
      setHarmonization(JSON.parse(data.result))
      setIsHarmonized(true)

    }
  }
  useEffect(() => {
    console.log(harmonization)
    console.log(typeof harmonization)
    console.log(harmonization.harmony)
  }, [harmonization])

  function printHarmony(harmony, index) {
    return <>
      <li key={index} className='flex gap-1' >
        <div className='flex  flex-col bg-white text-black p-3 rounded-2xl'>
          <span>{harmony.note}</span>
          <span>{harmony.chord}</span>
          <span>{harmony.romanNumeral}</span>
        </div>
        <div className='flex flex-col bg-neutral-400 text-black p-3 rounded-2xl'>

          <span>{harmony.commentary}</span>
        </div>
      </li >
    </>
  }
  return (
    <>
      <div className='w-full  flex flex-col justify-center items-center gap-1.5'>
        <button className='bg-white p-5 text-black rounded-2xl' onClick={startRecording}>Start Recording</button>
        <button className='bg-white p-5 text-black rounded-2xl' onClick={stopRecording} >Stop Recording</button>
        <div className='bg-blue-300 p-10 rounded-2xl mt-3'>
          <p className='text-4xl font-bold text-blue-800'>{melody.join('  ')}</p>
        </div>
        {/* <div className="bg-white flex justify-center"><MusicNotation melody={melody} /></div> */}
        <button className='bg-white p-5 text-black rounded-2xl' onClick={() => { llmAnalzye(melody, 'Bossa Nova', 'Advanced') }} >Analyze with AI</button>
        {/* Disabled when audio did not stop recordin */}

      </div>
      {isHarmonized && harmonization.harmony && <ul className=' flex  flex-col gap-1 mt-10' >
        {/* {console.log(Object.keys(harmonization), isHarmonized)} */}
        {harmonization.harmony.map((harmony, index) => {
          return printHarmony(harmony, index)
        })}
      </ul>}
    </>
  )
}

// export default App
