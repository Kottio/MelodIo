import { useParams } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import record from "./asset/record.png"
import recording from "./asset/recording.png"
import deleting from "./asset/delete.png"
import { useMeyda } from "@/hooks/useMeyda"
import { Button } from "../ui/button"
import { Divide } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const strRecording = "onClick({...})"

function Part() {
  const { partId, compositionId } = useParams<{ partId: string, compositionId: string }>()
  const { startRecording, stopRecording, melody, setMelody } = useMeyda()
  const [isRecording, setIsRecording] = useState(false)
  const [melodySaved, setMelodySaved] = useState(false)
  const [style, setStyle] = useState('BossaNova')
  const [level, setLevel] = useState('Intermediate')
  const [chord, setChord] = useState({})
  const [chordDetail, setChordDedtail] = useState(false)
  const [harmonization, setHarmonization] = useState({
    harmony: [],
    advices: [],
  })
  const [isHarmonized, setIsHarmonized] = useState(false)



  const harmonize = async function (melody: string[], style: string, level: string) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        melody, style, level
      })
    }
    const response = await fetch("http://localhost:8080/harmonize", options)
    if (response.ok) {
      const data = await response.json()
      console.log(data.JsonHarmonized)
      setHarmonization(JSON.parse(data.JsonHarmonized))
      console.log(data.JsonHarmonized)
      setIsHarmonized(true)

    }
  }

  function printMelody(melodyNote: string, index) {
    const isHarmony = melodyNote.chord === undefined ? false : true


    return <li key={index} className="flex flex-col justify-center items-center gap-2" >
      <div className="border-1 border-white bg-red-300 flex justify-start items-end w-30 h-18">
        <span className="text-3xl font-bold text-white p-2">{isHarmony ? melodyNote.chord : melodyNote}</span>
      </div>



      {!melodySaved && < button id="deleteNote" className="group" onClick={() => {
        setMelody((melody) => {
          const newMelody = [...melody]
          newMelody.splice(index, 1)
          return newMelody
        })
      }}>
        <svg width="25" height="25" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.75 7.25L7.25 21.75M7.25 7.25L21.75 21.75" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </button>
      }
    </li >
  }

  function printHarmony(harmony: string, index: number) {

    return <li key={index} className="flex flex-col justify-center items-center gap-2" >
      {/* <span className="text-xl font-bold text-white p-2">{harmony.romanNumeral}</span> */}
      <div className="flex flex-col items-center gap-3 pb-2 rounded hover:bg-cyan-800 transition-all transition-10"
        onClick={() => {
          setChord(harmony)
          setChordDedtail(true)
        }}
      >
        <div className="border-1 border-white bg-cyan-500 flex justify-start items-end w-30 h-18 ">
          <span className="text-xl font-bold text-white p-2">{harmony.chord}</span>


        </div>
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 16V32M16 24H32M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </li >
  }

  function printChordDetail(harmony) {
    return <div className="text-white flex flex-col border-1 p-5 border-cyan-300 gap-1 ">
      <div>
        <span className="text-2xl text-cyan-300 font-bold">{harmony.chord}</span>
        <span className="text-xl font-bold"> {harmony.romanNumeral}</span></div>
      <div className="flex text gap-3">
        <span >Scales: </span>
        <span className="text-rose-400 font-bold"> {harmony.potentialScales.join(' - ')}</span>
      </div>
      <div className="flex text gap-3">
        <span >Extensions: </span>
        <span className="text-orange-400 font-bold"> {harmony.extensions.join(' - ')}</span>
      </div>
      <span>{harmony.commentary}</span>

    </div>
  }


  return <>
    <div className="bg-white w-screen h-screen flex justify-center items-center"   >

      <section className="bg-[#101010] w-13/14 h-13/14 rounded flex flex-col  items-center">
        {/* <div className=" w-full flex flex-col items-center"> */}
        <div className="w-full pt-5 flex justify-center items-start gap-3">


          <div className="flex justify-end items-end w-5/7 pt-5 border-b-neutral-200 border-b-1 pb-2"></div>

          <div className="flex items-end gap-4">
            <span className="text-neutral-200">Intermediate</span>
            <svg width="25" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34 38V34C34 31.8783 33.1571 29.8434 31.6569 28.3431C30.1566 26.8429 28.1217 26 26 26H10C7.87827 26 5.84344 26.8429 4.34315 28.3431C2.84285 29.8434 2 31.8783 2 34V38M26 10C26 14.4183 22.4183 18 18 18C13.5817 18 10 14.4183 10 10C10 5.58172 13.5817 2 18 2C22.4183 2 26 5.58172 26 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>


        <div className=" w-8/9 border-l-1  flex  mt-3 px-5 justify-between items-start">

          {/* Side bar */}
          <div className="flex justify-start items-start">
            <div className="flex flex-col items-start justify-baseline  gap-2 ">

              <div className="flex">
                <Link to={`/composition/${compositionId}`} className="group border-white border-0"  >

                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.6667 19.9998L8.33332 19.9998M8.33332 19.9998L20 31.6665M8.33332 19.9998L20 8.33317" stroke="#E5E5EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[3] transition-all duration-300" />


                  </svg>

                </Link >
                <span className="text-3xl text-neutral-200">
                  PART {partId} of {compositionId}</span>
              </div>

              {/* <span className="text-white text-xl  mb-5 "> From composition 1</span> */}

              {/* Side Bar Analyzer */}
              {melodySaved && <div className="flex flex-col gap-3 items-start border-l-1 p-3 border-dashed ">

                {/* <span className="text-white text-2xl">Melody Saved</span> */}
                {/* <span className="text-white text-3xl">{melody.join('-')}</span> */}

                <span className="text-white text-xl font-bold">🤖 ANALYSIS</span>
                <Select onValueChange={(value) => setStyle(value)}>
                  <SelectTrigger className="w-[180px]" >
                    <SelectValue placeholder="Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bossa Nova">🇧🇷 Bossa Nova</SelectItem>
                    <SelectItem value="Gipsy Jazz">🚐 Gipsy Jazz</SelectItem>
                    <SelectItem value="Classical">🎻 Classical</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setLevel(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermidiate">Intermidiate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                < button className="text-white w-[180px] disabled:border-neutral-600 disabled:text-neutral-600  text-xl font-bold border-1 px-3 py-2 hover:bg-white hover:text-black transition-all disabled:hover:bg-black " onClick={() => {
                  harmonize(melody, style, level)
                }} disabled={isHarmonized} >:HARMONIZE </button>
              </div>

              }
              {/* <Button className="p-7" > Harmonize </Button> */}

            </div>
          </div>

          {/* Recording Section */}
          <section id="RecodingSection" className="flex flex-col gap-10 w-4/5 pt-10 items-center justify-center ">

            {!melodySaved &&

              <div>
                <span className="text-white text-xl ">:/ Recorder</span>
                {!isRecording ?

                  <div onClick={() => {
                    setIsRecording(true)
                    startRecording()
                  }} className="flex items-center justify-center gap-3 text-white border-1 border-white w-150 h-50
                
                hover:border-dashed">
                    <span className="text-2xl">{strRecording}</span>
                  </div> :



                  <div onClick={() => {
                    setIsRecording(false)
                    stopRecording()
                  }} className="flex items-center justify-center gap-3
                 text-white border-1 border-red-700 w-150 h-50
                 border-dashed">

                    <span className="text-2xl text-red-700">Recording...</span>
                  </div>
                }
              </div>}

            <ul className="flex gap-6">{melody.map((note, index) => printMelody(note, index))}</ul>

            {!melodySaved && <div><Button className="p-7 text-xl" disabled={isRecording || melody.length == 0} onClick={() => {
              setMelodySaved(true)
            }}> Save Melody</Button></div>}

            {isHarmonized && <ul className="flex gap-6">{harmonization.harmony.map((harmony, index) => printHarmony(harmony, index))}</ul>
            }
            <div className="flex flex-col items-center overflow-y-auto max-h-[400px]">

              {isHarmonized && <div className="w-8/9 flex flex-col gap-3 ">
                {chordDetail && <div>
                  {printChordDetail(chord)}
                </div>
                }

                {/* <span className="text-white text-xl font-bold">Recommendations for {style}</span>
                <ul className="flex flex-col justify-start gap-3">
                  {harmonization.advices.map((advice, index) => <li key={index} className="text-white border-l-1 px-3" >
                    <span>{advice.advice}</span>
                    <div className=" text-white text font-bold py-2 flex justify-start">{advice.example}</div>
                  </li>)}
                </ul> */}

              </div>
              }
            </div>


            {/* <div className="text-black text-4xl mt-5 p-5 bg-white rounded-3xl">{melody.join(' - ')}</div> */}




          </section>




        </div>




      </section >



    </div >
  </>

}
export default Part