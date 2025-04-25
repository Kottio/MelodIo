import React from 'react';

interface MusicNotationProps {
  melody: string[];
  clef?: 'treble' | 'bass';
  highlightFirstNote?: boolean;
  noteSpacing?: number;
}

const MusicNotation: React.FC<MusicNotationProps> = ({ 
  melody, 
  clef = 'treble', 
  highlightFirstNote = true,
  noteSpacing = 40
}) => {
  // Note positions and solfège names
  const noteData: Record<string, { 
    line: number, 
    accidental?: string,
    solfege: string 
  }> = {
    'C': { line: 6, solfege: 'Do' },
    'C#': { line: 5.5, accidental: '♯', solfege: 'Do#' },
    'Db': { line: 5.5, accidental: '♭', solfege: 'Ré♭' },
    'D': { line: 5, solfege: 'Ré' },
    'D#': { line: 4.5, accidental: '♯', solfege: 'Ré#' },
    'Eb': { line: 4.5, accidental: '♭', solfege: 'Mi♭' },
    'E': { line: 4, solfege: 'Mi' },
    'F': { line: 3, solfege: 'Fa' },
    'F#': { line: 2.5, accidental: '♯', solfege: 'Fa#' },
    'Gb': { line: 2.5, accidental: '♭', solfege: 'Sol♭' },
    'G': { line: 2, solfege: 'Sol' },
    'G#': { line: 1.5, accidental: '♯', solfege: 'Sol#' },
    'Ab': { line: 1.5, accidental: '♭', solfege: 'La♭' },
    'A': { line: 1, solfege: 'La' },
    'A#': { line: 0.5, accidental: '♯', solfege: 'La#' },
    'Bb': { line: 0.5, accidental: '♭', solfege: 'Si♭' },
    'B': { line: 0, solfege: 'Si' }
  };

  // Dimensions
  const staffLineSpacing = 16;
  const noteRadius = 8;
  const staffHeight = 4 * staffLineSpacing;
  const staffTop = 30;
  const clefWidth = 40;
  const stemLength = 28;
  const solfegeYOffset = staffTop + staffHeight + 30; // Position below staff

  const staffLines = [0, 1, 2, 3, 4];

  return (
    <div className="bg-white flex justify-center p-6">
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <svg 
          width={`${Math.max(melody.length * noteSpacing + clefWidth + 20, 300)}px`}
          height={`${solfegeYOffset + 30}px`} // Added space for solfège names
          viewBox={`0 0 ${Math.max(melody.length * noteSpacing + clefWidth + 20, 300)} ${solfegeYOffset + 30}`}
          preserveAspectRatio="xMinYMid meet"
        >
          {/* Staff lines */}
          {staffLines.map((line) => (
            <line 
              key={line}
              x1={clefWidth} 
              y1={staffTop + line * staffLineSpacing} 
              x2={melody.length * noteSpacing + clefWidth + 20} 
              y2={staffTop + line * staffLineSpacing} 
              stroke="black" 
              strokeWidth={3}
            />
          ))}
          
          {/* Clef */}
  
          
          {/* Notes and solfège names */}
          {melody.map((note, index) => {
            const data = noteData[note] || { line: 0, solfege: '' };
            const yPos = staffTop + data.line * (staffLineSpacing / 2);
            const xPos = clefWidth + 15 + index * noteSpacing;
            
            return (
              <g key={index} transform={`translate(${xPos}, 0)`}>
                {/* Accidental */}
                {data.accidental && (
                  <text 
                    x={-15} 
                    y={yPos + 5} 
                    fontSize={20}
                    fontFamily="Arial, sans-serif"
                  >
                    {data.accidental}
                  </text>
                )}
                
                {/* Note circle */}
                <circle 
                  cx={0} 
                  cy={yPos} 
                  r={noteRadius} 
                  fill={ 'black'}
                  stroke="black"
                  strokeWidth={1.5}
                />
                
                {/* Stem */}
                {data.line <= 3 && (
                  <line 
                    x1={noteRadius} 
                    y1={yPos - noteRadius} 
                    x2={noteRadius} 
                    y2={yPos - noteRadius - stemLength} 
                    stroke="black" 
                    strokeWidth={3}
                  />
                )}
                
                {/* Ledger lines */}
                {data.line > 6 && Array.from({ length: Math.ceil((data.line - 6) / 2) }).map((_, i) => (
                  <line 
                    key={`ledger-above-${i}`}
                    x1={-noteRadius * 1.5} 
                    y1={staffTop + (6 + i * 2) * (staffLineSpacing / 2)} 
                    x2={noteRadius * 1.5} 
                    y2={staffTop + (6 + i * 2) * (staffLineSpacing / 2)} 
                    stroke="black" 
                    strokeWidth={3}
                  />
                ))}
                {data.line < 0 && Array.from({ length: Math.ceil(Math.abs(data.line) / 2) }).map((_, i) => (
                  <line 
                    key={`ledger-below-${i}`}
                    x1={-noteRadius * 1.5} 
                    y1={staffTop + (0 - i * 2) * (staffLineSpacing / 2)} 
                    x2={noteRadius * 1.5} 
                    y2={staffTop + (0 - i * 2) * (staffLineSpacing / 2)} 
                    stroke="black" 
                    strokeWidth={3}
                  />
                ))}
                
                {/* Solfège name - large text below the staff */}
                <text 
                  x={0} 
                  y={solfegeYOffset} 
                  fontSize={24} // Large font size
                  fontWeight="bold"
                  textAnchor="middle" // Center text under note
                  fontFamily="Arial, sans-serif"
                  fill={ 'black'}
                >
                  {data.solfege}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default MusicNotation;
  //   const containerRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //   if (!containerRef.current) return;

  //   // Clear previous rendering
  //   containerRef.current.innerHTML = "";
  //   containerRef.current.id = "output"


  //   // Set up Factory with renderer
  //   const vf = new Factory({
  //     renderer: { elementId: "output"},
  //   });

  //   const score = vf.EasyScore();
  //   const system = vf.System();


  //   // Convert your note array into a string for EasyScore
  //   const noteString = melody.map(note => `${note}4/q`).join(", ");
  //   console.log(noteString)

  //   // Add a stave with melody only
  //   const beamParams = { options: { autoStem: true, StrictMode:false } };
  //   system.addStave({
  //     voices: [
  //       score.voice(score.notes(noteString, beamParams)),        
  //     ]
  //   }).addClef("treble").addTimeSignature("4/4");

  //   // Draw it!
  //   vf.draw();
  // }, [melody]);

  // return <div className="bg-white-300" ref={containerRef} />;
