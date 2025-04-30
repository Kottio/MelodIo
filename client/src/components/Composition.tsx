import { Link, useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { Button } from "./ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Scale from "./Part/scale";

function Composition() {
  const [parts, setParts] = useState([]);
  const { compositionId } = useParams<{ compositionId: string }>();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("Harmonization");

  async function getParts() {
    const response = await fetch(
      `http://localhost:8080/${compositionId}/Parts`
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      setParts(result.parts);
    }
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent page refresh
    postPart(name, type, compositionId);
    setCreating(false);
    setName("");
  }

  async function postPart(name: string, type: string, compositionId: string) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name,
        type,
        compositionId,
      }),
    };
    const response = await fetch(
      `http://localhost:8080/${compositionId}/Parts`,
      options
    );
    if (response.ok) {
      console.log("Part posted");
      getParts();
    }
  }

  useEffect(() => {
    getParts();
  }, []);

  function printPart(parts: {}) {
    return (
      <li key={parts?.id} className="flex items-center justify-center w-80">
        <Link
          to={`/composition/${compositionId}/part/${parts.id}`}
          className="group w-full flex  items-center transition-all duration-300"
        >
          {/* <div className="text-white">🎹</div> */}
          <div className="p-4 relative border-1  bg-black border-zinc-400 flex flex-col h-70  justify-between items-center  w-full group-hover:scale-105 group-hover:border-blue-300 transition-all duration-300">
            <div className="w-full">
              <div>
                <span className="text-xl font-medium text-zinc-200 pr-1 group-hover:text-blue-300">
                  {parts.name}{" "}
                </span>
              </div>
              <span className="text font-medium text-zinc-500">
                {parts.createdAt.split("T")[0]}
              </span>
              <div className="flex gap-5 items-start mt-1 flex-col ">
                <div className="flex flex-col gap-1 pt-3 items-start   w-full ">
                  {parts.session?.melody.length > 0 && (
                    <span className="text text-red-300 font-bold">
                      {parts.session.melody.join(" - ")}
                    </span>
                  )}
                  {parts.session?.harmonizedChords.length > 0 && (
                    <span className="text text-green-300">
                      {parts.session.harmonizedChords.join(" - ")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full justify-between items-end">
              <span
                className={`text-sm              ${parts?.type == "Harmonization"
                  ? "text-indigo-300"
                  : parts.type == "Scales"
                    ? "text-orange-300"
                    : "text-red-300"
                  }`}
              >
                {parts.type}
              </span>

              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-300"
              >
                <path
                  d="M8.33334 19.9999H31.6667M31.6667 19.9999L20 8.33325M31.6667 19.9999L20 31.6666"
                  stroke="#E5E5EA"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 group-hover:stroke-[3] group-hover:stroke-blue-300"
                />
              </svg>
            </div>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <>
      <div className="w-screen h-screen  bg-[#101010] flex justify-center items-center">
        {/* style={{ backgroundImage: `url(${doodad})` }} */}
        {creating && (
          <Card className="absolute z-10 w-100">
            <CardHeader>
              <CardTitle>Create a new Element</CardTitle>
              <CardDescription>
                Set up your new creative workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className="flex flex-col gap-1"
              >
                <p>Enter a name for your Element</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Input>

                <p className="pt-2">Set up a Type</p>
                <Select onValueChange={(value) => setType(value)}>
                  <SelectTrigger className="w-full text-black ">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Harmonization">Harmonization</SelectItem>
                    <SelectItem value="Scales">Scales</SelectItem>
                    <SelectItem value="Chords">Chords</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex justify-around items-center mt-7">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setCreating(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-black text-white border-black hover:bg-white hover:text-black"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <section
          className={`bg-[#101010] w-25/26 h-25/26 rounded flex flex-col  items-center ${!creating ? "no-blur" : "blur-sm"
            } transition-all duration-300`}
        >
          {" "}
          {/* <div className=" w-full flex flex-col items-center"> */}
          <div className="w-full pt-3 pb-2 flex justify-center items-center gap-3">
            <div className="flex justify-end items-end w-9/12 pt-5 border-b-neutral-200 border-b-1"></div>

            <div className="flex items-end gap-4">
              <span className="text-neutral-200 w-23 text-right">Advanced</span>
              <svg
                width="25"
                height="40"
                viewBox="0 0 36 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34 38V34C34 31.8783 33.1571 29.8434 31.6569 28.3431C30.1566 26.8429 28.1217 26 26 26H10C7.87827 26 5.84344 26.8429 4.34315 28.3431C2.84285 29.8434 2 31.8783 2 34V38M26 10C26 14.4183 22.4183 18 18 18C13.5817 18 10 14.4183 10 10C10 5.58172 13.5817 2 18 2C22.4183 2 26 5.58172 26 10Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className=" w-11/12 border-l-1  flex  mt-3 px-5 gap-10 justify-between items-start">
            {/* Side bar */}
            <div className="flex justify-start items-start w-1/5">
              <div className="flex flex-col items-start justify-baseline  ">
                <div className="flex">
                  <Link to={`/`} className="group border-white border-0">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31.6667 19.9998L8.33332 19.9998M8.33332 19.9998L20 31.6665M8.33332 19.9998L20 8.33317"
                        stroke="#E5E5EA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:stroke-[3] transition-all duration-300"
                      />
                    </svg>
                  </Link>
                  <span className="text-3xl text-neutral-200">
                    CreativePod{" "}
                  </span>
                </div>
                <span className=" text-neutral-200 mt-3">Welcome to your new <strong className="text-red-300">CreativePod</strong>. </span>
                {/* <button className="text-white flex items-center gap-2 hover:border-1 hover:px-3 hover:py-2 p-1 rounded transition-all duration-300"
                onClick={() => { setCreating(true) }} >
                <svg width="40" height="40" viewBox="0 0 82 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M41 26.6665V53.3332M27.3333 39.9998H54.6666M75.1666 39.9998C75.1666 58.4093 59.8697 73.3332 41 73.3332C22.1302 73.3332 6.83331 58.4093 6.83331 39.9998C6.83331 21.5903 22.1302 6.6665 41 6.6665C59.8697 6.6665 75.1666 21.5903 75.1666 39.9998Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Create new


              </button>
 */}

                <div className="flex flex-col mt-10">
                  {/* <span className="text-white">Stye [....]</span>
                <span className="text-white">CreatedAt/:</span> */}
                </div>
              </div>
            </div>

            <div className="mt-1 pl-5 w-full">
              {/* Conditional Rendering */}
              <ul className="grid grid-cols-3 gap-3 p-3 border-1 bg-neutral-900 h-165 rounded content-start overflow-auto">
                {parts.map((part) => {
                  if (part.type !== "Scales") return printPart(part);
                  else {
                    return <Scale partId={part.id}></Scale>;
                  }
                })}

                {/* Create New Part Button */}
                <button
                  className="text-white flex group justify-center items-center gap-2 cursor-pointer
 border-1 border-dashed px-3 py-2 h-70 hover:bg-gray-200 hover:text-black hover:font-bold rounded transition-all duration-300"
                  onClick={() => {
                    setCreating(true);
                  }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 82 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M41 26.6665V53.3332M27.3333 39.9998H54.6666M75.1666 39.9998C75.1666 58.4093 59.8697 73.3332 41 73.3332C22.1302 73.3332 6.83331 58.4093 6.83331 39.9998C6.83331 21.5903 22.1302 6.6665 41 6.6665C59.8697 6.6665 75.1666 21.5903 75.1666 39.9998Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-black transition-all transition-300 group-hover:stroke-3 "
                    />
                  </svg>
                  Create
                </button>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Composition;

// <li key={parts?.id} className="flex items-center justify-center">
//   <Link to={`/composition/${compositionId}/part/${parts.id}`} className="group w-full flex items-center"  >
//     <div className="text-white">🎹</div>
//     <div className="p-4 relative border-b-1 border-b-zinc-400 flex justify-between items-center  w-full" >
//       <div className="w-full">
//         <div >
//           <span className="text-xl font-medium text-zinc-200 pr-3 group-hover:text-blue-300">{parts.name} </span>
//           <span className="text-sm font-medium text-zinc-400" >{parts.createdAt.split('T')[0]}</span>
//         </div>
//         <div className="flex gap-5 items-end mt-1  ">
//           <span className="text-sm text-zinc-400" >{parts.type}</span>
//           <div className="flex gap-5 items-end   w-full ">
//             {parts.session?.melody.length > 0 && <span className="text text-red-300 font-bold" >{parts.session.melody.join(' - ')}</span>}
//             {parts.session?.harmonizedChords.length > 0 && <span className="text text-green-300 font-bold" >{parts.session.harmonizedChords.join(' - ')}</span>
//             }</div>

//         </div>
//       </div>

//       <div className="flex  items-center">
//         <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300" >
//           <path d="M8.33334 19.9999H31.6667M31.6667 19.9999L20 8.33325M31.6667 19.9999L20 31.6666" stroke="#E5E5EA" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-[3] group-hover:stroke-blue-300" />
//         </svg>

//       </div>
//     </div >
//   </Link >
// </li >
