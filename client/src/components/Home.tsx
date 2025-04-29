
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
// import doodad from "./Part/asset/doodad.png"
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useEffect, useState } from "react"
import { getMusicStyleEmoji } from "@/hooks/emoji";



function Home() {
  const [compositions, setcompositions] = useState<any[]>([]);
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [style, setStyle] = useState('')




  async function getComposition() {
    const response = await fetch('http://localhost:8080/compositions')
    if (response.ok) {
      const result = await response.json()
      setcompositions(result.compositions)
      console.log(result.compositions)

    } else { console.error('Fetching the composition did not work') }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent page refresh
    postComposition(name, description, style)

    setCreating(false)
    setName('')
    setDescription('')
  }

  async function postComposition(name: string, description: string, style: string) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        name, description, style
      })
    }
    const response = await fetch('http://localhost:8080/composition', options)
    if (response) { getComposition() }
  }

  useEffect(() => {
    getComposition()

  }, [])




  function printComposition(composition: {}) {
    return <li key={composition?.id} className="flex items-center justify-center">
      <Link to={`/composition/${composition.id}`} className="group w-full flex items-center" >
        <div className="text-white">{getMusicStyleEmoji(composition.styles[0])}</div>
        <div className="p-4  border-b-1 border-b-zinc-400 flex justify-between items-center  w-full " >
          <div >
            <div  >
              <span className="text-xl font-medium text-zinc-200 pr-3  group-hover:text-blue-300">{composition.name}</span>
              <span className="text-sm font-medium text-zinc-400" >{composition.createdAt.split('T')[0]}</span>
            </div>
            <span className="text-sm text-zinc-400 " >{composition.description}</span>
            <span className="text  pl-5 font-medium text-blue-300" >{composition.styles[0]}</span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-zinc-200 pr-5"  >{composition.status}</span>
            {/* <span className="text-sm text-zinc-400" >{composition.stared}</span> */}

            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300" >
              <path d="M8.33334 19.9999H31.6667M31.6667 19.9999L20 8.33325M31.6667 19.9999L20 31.6666" stroke="#E5E5EA" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-[3]  group-hover:stroke-blue-300" />
            </svg>

          </div>
        </div>
      </Link>
    </li>
  }
  return <>
    <div className='w-screen h-screen flex justify-center items-center'  >

      {/* style={{ backgroundImage: `url(${doodad})` }} */}

      {creating && <Card className="absolute z-10 w-100">
        <CardHeader>
          <CardTitle>Create a new Composition</CardTitle>
          <CardDescription>Set up yopur new creative workspace</CardDescription>
        </CardHeader>
        <CardContent >
          <form onSubmit={(e) => { handleSubmit(e) }} className="flex flex-col gap-1">
            <p >Enter a name for your Composition</p>
            <Input value={name} onChange={(e) => setName(e.target.value)}></Input>

            <p className="pt-2">Enter a short description</p>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} ></Input>

            <p className="pt-2">Style</p>

            <Select onValueChange={(value) => setStyle(value)}>
              <SelectTrigger className="w-full text-black " >
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bossa Nova">🇧🇷 Bossa Nova</SelectItem>
                <SelectItem value="Gipsy Jazz">🚐 Gipsy Jazz</SelectItem>
                <SelectItem value="Classical">🎻 Classical</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex justify-around items-center mt-7">
              <Button variant="ghost" onClick={() => { setCreating(false) }}>Cancel</Button>
              <Button type="submit" className="bg-black text-white border-black hover:bg-white hover:text-black">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card >
      }

      <section className={`bg-[#101010] w-13/14 h-13/14 rounded flex flex-col  items-center ${!creating ? 'no-blur' : 'blur-sm'} transition-all duration-300`}>


        {/* <div className=" w-full flex flex-col items-center"> */}
        <div className="w-full pt-5 flex justify-center items-start gap-3" >


          <div className="flex justify-end items-end w-5/7 pt-5 border-b-neutral-200 border-b-1 pb-2 "></div>

          <div className="flex items-end gap-4">
            <span className="text-neutral-200 w-23 text-right">Advanced</span>
            <svg width="25" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34 38V34C34 31.8783 33.1571 29.8434 31.6569 28.3431C30.1566 26.8429 28.1217 26 26 26H10C7.87827 26 5.84344 26.8429 4.34315 28.3431C2.84285 29.8434 2 31.8783 2 34V38M26 10C26 14.4183 22.4183 18 18 18C13.5817 18 10 14.4183 10 10C10 5.58172 13.5817 2 18 2C22.4183 2 26 5.58172 26 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>


        <div className=" w-8/9 border-l-1  flex  mt-3 px-5 justify-between items-start ">

          {/* Side bar */}
          <div className="flex justify-start items-start">
            <div className="flex flex-col  items-start gap-1 h-100 ">

              <div className="flex">
                <span className="text-3xl text-neutral-200">
                  COMPOSITIONS </span>
              </div>
              <button className="text-white flex items-center gap-2 hover:border-1 hover:px-3 hover:py-2 p-1 rounded transition-all duration-300"
                onClick={() => { setCreating(true) }} >
                <svg width="40" height="40" viewBox="0 0 82 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M41 26.6665V53.3332M27.3333 39.9998H54.6666M75.1666 39.9998C75.1666 58.4093 59.8697 73.3332 41 73.3332C22.1302 73.3332 6.83331 58.4093 6.83331 39.9998C6.83331 21.5903 22.1302 6.6665 41 6.6665C59.8697 6.6665 75.1666 21.5903 75.1666 39.9998Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Create new


              </button>

              <div className="flex flex-col">

                {/* <span className="text-white">Stye [....]</span>
                <span className="text-white">CreatedAt/:</span> */}
              </div>
            </div>
          </div>


          <div className="w-7/8  mt-5 pl-5 flex flex-col items-center">
            {/* Conditional Rendering */}


            <ul className="flex flex-col gap-5 p-3 w-full">
              {compositions.map(comp => printComposition(comp))}
            </ul>

          </div>
        </div>
        {/* </div> */}
      </section >



    </div >
  </>


}
export default Home