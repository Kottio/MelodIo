import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Slider } from "@/components/ui/slider";

function Scale({ partId }) {
  const [Scales, setScales] = useState([]);
  const [brightness, setBrightness] = useState(5);
  const [currentScale, setCurrentScale] = useState({})
  const [root, setRoot] = useState('C')
  async function getScales() {
    const data = await fetch("http://localhost:8080/Scales");
    if (data.ok) {
      const scales = await data.json();
      setScales(scales.scales)

    }
  }
  useEffect(() => {
    getScales();
    filterScales(brightness)
  }, []);

  const chromaticScale = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  function filterScales(level: int) {
    const currentScale = Scales.filter(scale => { return scale.brightness == level })
    setCurrentScale(currentScale)
    console.log("Scales", currentScale)

  }
  return (
    <li className="flex items-center justify-center w-80 text-white">
      <div className="p-4 relative border-1  bg-black border-zinc-400 flex flex-col h-70  items-start  w-full group-hover:scale-105 group-hover:border-blue-300 transition-all duration-300 justify-between">
        <div className="flex flex-col gap-3  w-full">
          <span className="text-xl font-medium">Scale Creator</span>
          <div className="flex items-center justify-between w-full gap-5">
            <Select value={root} onValueChange={(value) => (setRoot(value))}>
              <SelectTrigger className="w-25 text-orange-200 text-xl font-bold rounded border-neutral-600">
                <SelectValue placeholder="C" />
              </SelectTrigger>
              <SelectContent className=" w-10 rounded">
                {chromaticScale.map((note) => {
                  return (
                    <SelectItem
                      className="rounded focus:bg-orange-200"
                      key={note}
                      value={note}
                    >
                      {" "}
                      {note}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <div className="flex w-full items-center gap-2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42 25.58C41.6854 28.9844 40.4077 32.2288 38.3165 34.9336C36.2253 37.6383 33.407 39.6916 30.1914 40.8531C26.9758 42.0146 23.496 42.2362 20.159 41.4922C16.822 40.7481 13.766 39.0691 11.3484 36.6516C8.9309 34.234 7.25186 31.178 6.5078 27.841C5.76374 24.504 5.98542 21.0242 7.14691 17.8086C8.30839 14.593 10.3616 11.7747 13.0664 9.68351C15.7712 7.59228 19.0156 6.31461 22.42 6C20.4268 8.69653 19.4677 12.0189 19.717 15.3628C19.9664 18.7068 21.4077 21.8501 23.7788 24.2212C26.1499 26.5923 29.2932 28.0336 32.6372 28.2829C35.9811 28.5323 39.3034 27.5732 42 25.58Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <Slider
                defaultValue={[brightness]}
                // value={[brightness]}
                onValueChange={(value) => { filterScales(value[0]) }}
                max={10}
                step={1}
              />

              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_128_403)">
                  <path
                    d="M24 2V6M24 42V46M8.44 8.44L11.28 11.28M36.72 36.72L39.56 39.56M2 24H6M42 24H46M8.44 39.56L11.28 36.72M36.72 11.28L39.56 8.44M34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_128_403">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

          </div>

          <section className="text-white">
            {currentScale[0] && <div className="flex flex-col ">
              <span className="text-xl text-orange-400"> {currentScale[0].name}</span>
              <span> {currentScale[0].description}</span>
              <span className="w-full">
                <ul className="flex justify-around pt-3 ">
                  {currentScale[0]
                    .notes
                    .find((modeNote) => modeNote.root === root)
                    ?.notes.map((note, index) => {
                      return <li key={index} className="text-white font-bold border-1 w-8 h-8 flex items-center justify-center bg-amber-600">{note}</li>
                    })
                  }
                </ul>
              </span>

            </div>}
          </section>


        </div>
        <div className="w-full flex justify-between items-center">
          <span className={`text-sm text-orange-300`}>Scales</span>
          <button className="rounded px-2 flex justify-center items-center hover:bg-amber-600 active:bg-amber-800 ">Save</button>
        </div>
      </div>
    </li>
  );
}
export default Scale;
