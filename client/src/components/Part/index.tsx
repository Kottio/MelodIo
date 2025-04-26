import { useParams } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import record from "./asset/record.png"
import recording from "./asset/recording.png"
import deleting from "./asset/delete.png"
import { useMeyda } from "@/hooks/useMeyda"
import { Button } from "../ui/button"


function Part() {
  const { partId, compositionId } = useParams<{ partId: string, compositionId: string }>()
  const { startRecording, stopRecording, melody, setMelody } = useMeyda()
  const [isRecording, setIsRecording] = useState(false)
  const [melodySaved, setMelodySaved] = useState(false)



  function printMelody(melodyNote: string, index) {
    return <li key={index} className="flex flex-col justify-center items-center gap-2" >
      <div className="bg-white p-5 rounded flex justify-center items-center w-20 h-20">
        <span className="text-4xl">{melodyNote}</span>
      </div>

      {!melodySaved && < button id="deleteNote" className="group" onClick={() => {
        setMelody((melody) => {
          const newMelody = [...melody]
          newMelody.splice(index, 1)
          return newMelody
        })
      }}>
        <svg width="25" height="25" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M13.125 39.375C12.0937 39.375 11.2109 39.0078 10.4766 38.2734C9.74219 37.5391 9.375 36.6563 9.375 35.625V11.25H7.5V7.5H16.875V5.625H28.125V7.5H37.5V11.25H35.625V35.625C35.625 36.6563 35.2578 37.5391 34.5234 38.2734C33.7891 39.0078 32.9063 39.375 31.875 39.375H13.125ZM31.875 11.25H13.125V35.625H31.875V11.25ZM16.875 31.875H20.625V15H16.875V31.875ZM24.375 31.875H28.125V15H24.375V31.875Z" fill="#FFF4F4" />
        </svg>
      </button>
      }
    </li >
  }


  return <>
    <div className="bg-zinc-200 w-screen h-screen flex justify-center items-center"   >

      <section className="bg-zinc-800 w-7/8 h-7/8 rounded-xl flex flex-col  items-center">
        {/* <div className=" w-full flex flex-col items-center"> */}

        <div className="flex justify-between items-end w-5/6 pt-10 border-b-neutral-200 border-b-1 pb-2">
          <div className="flex items-end gap-2">
            <Link to={`/composition/${compositionId}`} className="group"  >

              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.6667 19.9998L8.33332 19.9998M8.33332 19.9998L20 31.6665M8.33332 19.9998L20 8.33317" stroke="#E5E5EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[3] transition-all duration-300" />


              </svg>
            </Link >


            <span className="text-3xl text-neutral-200">Part number {partId} of {compositionId}</span>
          </div>
          <div className="flex items-end gap-4">
            {/* Make it a global context that can be updated */}
            <span className="text-neutral-200">Intermediate</span>
            <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34 38V34C34 31.8783 33.1571 29.8434 31.6569 28.3431C30.1566 26.8429 28.1217 26 26 26H10C7.87827 26 5.84344 26.8429 4.34315 28.3431C2.84285 29.8434 2 31.8783 2 34V38M26 10C26 14.4183 22.4183 18 18 18C13.5817 18 10 14.4183 10 10C10 5.58172 13.5817 2 18 2C22.4183 2 26 5.58172 26 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </div>
        </div>
        <section id="RecodingSection" className="flex flex-col pt-5 my-10 gap-10  items-center justify-center  ">

          {!melodySaved && <div>
            {!isRecording ?
              <div onClick={() => {
                setIsRecording(true)
                startRecording()
              }} className="flex items-center gap-3 text-white">

                <img src={record} alt="" className="w-20" />
              </div> :



              <div onClick={() => {
                setIsRecording(false)
                stopRecording()
              }} className="flex items-center gap-3 text-white">

                <img src={recording} alt="" className="w-20" />
              </div>
            }
          </div>}

          <ul className="flex gap-5 h-20">{melody.map((note, index) => printMelody(note, index))}</ul>

          {!melodySaved && <div><Button disabled={isRecording || melody.length == 0} onClick={() => {
            setMelodySaved(true)
          }}> Save the Melody</Button></div>}


          {/* <div className="text-black text-4xl mt-5 p-5 bg-white rounded-3xl">{melody.join(' - ')}</div> */}




        </section>









      </section >



    </div >
  </>

}
export default Part