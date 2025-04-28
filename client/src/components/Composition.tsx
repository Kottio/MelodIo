import { Link, useParams } from "react-router-dom"
import { use, useEffect, useState } from "react"
import { Button } from "./ui/button"
import doodad from "./Part/asset/doodad.png"



function Composition() {
  const [parts, setParts] = useState([])
  const { compositionId } = useParams<{ compositionId: string }>()

  async function getParts() {
    const response = await fetch(`http://localhost:8080/${compositionId}/Parts`)
    if (response.ok) {
      const result = await response.json()
      console.log(result)
      setParts(result.part)
    }
  }

  useEffect(() => { getParts() }, [])

  function printPart(parts: {}) {
    return <li key={parts?.id} className="flex items-center justify-center">
      <div className="text-white">🎹</div>
      <div className="p-4 relative border-b-1 border-b-zinc-400 flex justify-between items-center  w-full" >
        <div >
          <div >
            <span className="text-xl font-medium text-zinc-200 pr-3">{parts.name} </span>
            <span className="text font-medium text-zinc-400" >{parts.created_at}</span>
          </div>
          <span className="text-sm text-zinc-400" >{parts.type}</span>
        </div>

        <div className="flex items-center">

          <span className="text-sm text-zinc-200 pr-5 flex flex-col items-center "  >
            {parts.styles}
            <svg width="2" height="22" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 41V0.5" stroke="url(#paint0_linear_12_210)" strokeLinecap="round" />
              <defs>
                <linearGradient id="paint0_linear_12_210" x1="1.5" y1="31" x2="1.5" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0.361538" stopColor="#D9D9D9" />
                  <stop offset="0.793269" stopColor="#D9D9D9" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

          </span>

          {/* <span className="text-sm text-zinc-400" >{composition.stared}</span> */}
          <Link to={`/composition/${compositionId}/part/${parts.id}`} className="group" >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300" >
              <path d="M8.33334 19.9999H31.6667M31.6667 19.9999L20 8.33325M31.6667 19.9999L20 31.6666" stroke="#E5E5EA" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-[3]" />
            </svg>

          </Link>

        </div>
      </div>
    </li>
  }

  return <>
    <div className='w-screen h-screen flex justify-center items-center'  >
      {/* style={{ backgroundImage: `url(${doodad})` }} */}

      <section className="bg-[#101010] w-13/14 h-13/14 rounded flex flex-col  items-center">        {/* <div className=" w-full flex flex-col items-center"> */}

        <div className="w-full pt-5 flex justify-center items-start gap-3">


          <div className="flex justify-end items-end w-5/7 pt-5 border-b-neutral-200 border-b-1 pb-2"></div>

          <div className="flex items-end gap-4">
            <span className="text-neutral-200 w-23 text-right">Advanced</span>
            <svg width="25" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34 38V34C34 31.8783 33.1571 29.8434 31.6569 28.3431C30.1566 26.8429 28.1217 26 26 26H10C7.87827 26 5.84344 26.8429 4.34315 28.3431C2.84285 29.8434 2 31.8783 2 34V38M26 10C26 14.4183 22.4183 18 18 18C13.5817 18 10 14.4183 10 10C10 5.58172 13.5817 2 18 2C22.4183 2 26 5.58172 26 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>


        <div className=" w-8/9 border-l-1  flex  mt-3 px-5 justify-between items-start">

          {/* Side bar */}
          <div className="flex justify-start items-start">
            <div className="flex flex-col items-start justify-baseline  ">

              <div className="flex">
                <Link to={`/`} className="group border-white border-0"  >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.6667 19.9998L8.33332 19.9998M8.33332 19.9998L20 31.6665M8.33332 19.9998L20 8.33317" stroke="#E5E5EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[3] transition-all duration-300" />
                  </svg>


                </Link >
                <span className="text-3xl text-neutral-200">
                  PARTS </span>
              </div>
              <span className="text-xl  text-neutral-200">
                Composition {compositionId} </span>
              <div className="flex flex-col mt-10">
                <span className="text-white">Stye [....]</span>
                <span className="text-white">CreatedAt/:</span>
              </div>
            </div>
          </div>

          <div className="w-5/6 mt-5 pl-5">
            {/* Conditional Rendering */}
            <ul className="flex flex-col gap-5 p-3">
              {parts.map(part => printPart(part))}
            </ul>
          </div>
        </div>
      </section >



    </div >
  </>

}

export default Composition