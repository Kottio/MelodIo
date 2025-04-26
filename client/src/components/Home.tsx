
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import doodad from "./Part/asset/doodad.png"


const compositions = [
  {
    id: 1,
    name: 'First Composition',
    description: 'My frist compistion in htis app',
    created_at: '26/04/2025',
    status: 'In progress',
    stared: true
  },
  {
    id: 2,
    name: 'Whereas Composition',
    description: 'My Second compistion in htis app',
    created_at: '26/04/2025',
    status: 'In progress',
    stared: false
  },
  {
    id: 3,
    name: 'My Bossa Nova on the Way',
    description: 'My Second compistion in htis app',
    created_at: '26/04/2025',
    status: 'In progress',
    stared: false
  }


]
function Home() {
  function printComposition(composition: {}) {
    return <li key={composition?.id} className="flex items-center justify-center">
      <div className="text-white">🎹</div>
      <div className="p-4  border-b-1 border-b-zinc-400 flex justify-between items-center  w-full" >
        <div >
          <div >
            <span className="text-xl font-medium text-zinc-200 pr-3">{composition.name}</span>
            <span className="text font-medium text-zinc-400" >{composition.created_at}</span>
          </div>
          <span className="text-sm text-zinc-400" >{composition.description}</span>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-zinc-200 pr-5"  >{composition.status}</span>
          {/* <span className="text-sm text-zinc-400" >{composition.stared}</span> */}
          <Link to={`/composition/${composition.id}`} className="group" >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300" >
              <path d="M8.33334 19.9999H31.6667M31.6667 19.9999L20 8.33325M31.6667 19.9999L20 31.6666" stroke="#E5E5EA" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-[3]" />
            </svg>

          </Link>

        </div>
      </div>
    </li>
  }
  return <>
    <div className='w-screen h-screen flex justify-center items-center' style={{ backgroundImage: `url(${doodad})` }} >
      <section className="bg-zinc-800 w-7/8 h-7/8 rounded-xl flex flex-col  items-center">
        {/* <div className=" w-full flex flex-col items-center"> */}

        <div className="flex justify-between items-end w-5/6 pt-10 border-b-neutral-200 border-b-1 pb-2">
          <span className="text-3xl text-neutral-200">Compositions</span>
          <div className="flex items-end gap-4">
            {/* Make it a global context that can be updated */}
            <span className="text-neutral-200">Intermediate</span>
            <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34 38V34C34 31.8783 33.1571 29.8434 31.6569 28.3431C30.1566 26.8429 28.1217 26 26 26H10C7.87827 26 5.84344 26.8429 4.34315 28.3431C2.84285 29.8434 2 31.8783 2 34V38M26 10C26 14.4183 22.4183 18 18 18C13.5817 18 10 14.4183 10 10C10 5.58172 13.5817 2 18 2C22.4183 2 26 5.58172 26 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </div>
        </div>

        <div className="w-7/8 border-l-1 mt-5 pl-5">
          {/* Conditional Rendering */}
          <ul className="flex flex-col gap-5 p-3">
            {compositions.map(comp => printComposition(comp))}
          </ul>
        </div>
        {/* </div> */}
      </section >



    </div >
  </>


}
export default Home