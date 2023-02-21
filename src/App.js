import './App.css'
import React, { useState } from 'react';
import songdata00 from './songdata/songdata00'
import songdata01 from './songdata/songdata01'
import songdata02 from './songdata/songdata02'
import songdata03 from './songdata/songdata03'
import songdata04 from './songdata/songdata04'
import songdata05 from './songdata/songdata05'
import songdata06 from './songdata/songdata06'
import songdata07 from './songdata/songdata07'
import songdata08 from './songdata/songdata08'
import songdata09 from './songdata/songdata09'
import changeChord from './changeChord'

export default function App() {
  const songList = [
    songdata00,
    songdata01,
    songdata02,
    songdata03,
    songdata04,
    songdata05,
    songdata06,
    songdata07,
    songdata08,
    songdata09,
  ]


  const [select, setSelect] = useState(
    {id: "",
    title: "",
    rootkey: "",
    artist: "",
    Tempo: "",
    score: "",
    chordArray: []
    }
    )

  const handleClick = (el) => {
    console.log(el.target.getAttribute("value"))
    let found = songList.find(i=>i.id === Number(el.target.getAttribute("value")))
    console.log(found)
    console.log(`select : ${select}`)
    setSelect({...select,...found})
    console.log(`select : ${select}`)
  }

  return (
    <div>
      {songList.map((i) => {
        return <p key={i.id} value={i.id} onClick={handleClick}>{i.title}</p>
      })}
      <SongContainer selSong={select} />
    </div>
  )

}

//song container 컴포넌트

const SongContainer = ({selSong}) => {
  //곡 내부 입력 코드 배열화  ---1 인자
  const chordIn = selSong.chordArray.map(i=>i.chord)
  console.log('chordIn: ', chordIn)
  
  //근음과 스케일을 넣으면 근음을 기준으로 한 '루트기준스케일'로 되돌려주는 함수.   --2인자
  const changeScale = (root)=>{
    const tempScale = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
    let k = tempScale.indexOf(root)
      for(let i =0; i<k; i++){
        tempScale.push(tempScale[0])
        tempScale.shift()
      }
      return tempScale
  }

  console.log('chordScale: ', changeScale(selSong.rootkey))

  //'루트기준 스케일'과 '곡내부 입력코드 배열'을 넣으면, '변환 후 코드배열'을 출력해주느 함수.   --1 인자와 --2 인자를 매개변수로 받는 함수. 
  const transfer = (array1, array2) => {
    const rootChordObj= changeChord(array2)
    const chordOut=array1.map(chord=>{
          if(rootChordObj.hasOwnProperty(chord)){
          return rootChordObj[chord]
            }
          else
            return chord
          }
          )
    return chordOut
  }

  console.log('transfer: ', transfer(chordIn,changeScale(selSong.rootkey)))

  //chordIn을 이용해서 output을 실행

  const chordOut= transfer(chordIn,changeScale(selSong.rootkey))

  return (
    <div>   
     <h4>곡명 : {selSong.title}</h4>
     <h4>템포 : {selSong.tempo}</h4>
     <h4>근음 : {selSong.rootkey}</h4>
      <div className="container">
        <img src= {selSong.score} alt="Score" width="500px"/> 
        {selSong.chordArray.map((it,index) => (
          <p key={index} className="chord" style={it.pos}>{chordOut[index]}</p>
       ))}
     </div>
    </div>
  )
}


//   const [select, setSelect] = useState({ selNo: 0 })

//   const selSong = (e) => {
//     setSelect({ selNo: e })
//     console.log(select.selNo)
//   }

// //여기서부터는 루트키 변경 함수 작성

//   const chordNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

//   const [rootKey, setRootKey] =useState('C')
//   let copyChordNames = []

//   const chordIn = songList[select.selNo].chordArray.map(it=>{
//     return it.chord
//   })

//   const [chordOutput, setChordOutput] =useState([])

//   let chordOut = [] 


//   // transfer 함수 
//   const transfer = (e) => {
//     setRootKey(e.target.value)

//     copyChordNames = [...chordNames]

//     let k = chordNames.indexOf(rootKey)
//     for(let i =0; i<k; i++){
//     copyChordNames.push(copyChordNames[0])
//     copyChordNames.shift()
//     }
//     const chordObj={
//       "1" : `${copyChordNames[0]}`,
//       "2b" : `${copyChordNames[9]}7/${copyChordNames[1]}`,
//       "2" : `${copyChordNames[2]}m7`,
//       "3" : `${copyChordNames[0]}/${copyChordNames[4]}`,
//       "4" : `${copyChordNames[5]}`,
//       "5" : `${copyChordNames[7]}`,
//       "5/4" : `${copyChordNames[7]}/${copyChordNames[5]}`,
//       "5dom7" : `${copyChordNames[7]}7`,
//       "5m" : `${copyChordNames[7]}m`,
//       "6b" : `${copyChordNames[4]}7b9/${copyChordNames[8]}`,
//       "6" : `${copyChordNames[9]}m7`,
//       "7b" : `${copyChordNames[10]}`,
//       "7bM7" : `${copyChordNames[10]}M7`,
//       "7" : `${copyChordNames[7]}/${copyChordNames[11]}`,
//       "4/1": `${copyChordNames[5]}/${copyChordNames[0]}`,
//       "4/6": `${copyChordNames[5]}/${copyChordNames[9]}`,
//       "5/1": `${copyChordNames[7]}/${copyChordNames[0]}`,
//       "1/5": `${copyChordNames[0]}/${copyChordNames[7]}`,
//       "7b/1": `${copyChordNames[10]}/${copyChordNames[0]}`,
//       "3m" : `${copyChordNames[4]}m7`,
//       "3m/5" : `${copyChordNames[4]}m/${copyChordNames[7]}`,
//       "3dom7" : `${copyChordNames[4]}7`,
//       "4/5" : `${copyChordNames[5]}/${copyChordNames[7]}`,
//       "5b" : `${copyChordNames[2]}7/${copyChordNames[6]}`,
//       "4m" : `${copyChordNames[5]}m6`,
//       "4m/1" : `${copyChordNames[5]}m6/${copyChordNames[0]}`
  
//       }

//     chordOut=chordIn.map(chord=>{
//     if(chordObj.hasOwnProperty(chord)){
//     return chordObj[chord]
//       }
//     else
//       return chord
//     }
//     )

//     setChordOutput(chordOut)
//   }


//   return (
//     <div>
//       <div className="select-song">
//       {songList.map((it) => (
//         <a href="#!"> <p key={it.id} value={it.id} onClick={() => { selSong(it.id) }} > {it.title} </p></a>))} 
//       </div>
//       <div className="song-description"><p>ID :{songList[select.selNo].id}</p>
//       <p>Title : {songList[select.selNo].title}</p>
//       <p>Root : {songList[select.selNo].rootkey}</p>
//       <p>Tempo : {songList[select.selNo].Tempo}</p>
//       </div>
//       <div className="switch-field">
//         <input type="radio" id="root_A" name="root" value="A"  onClick={e=>{transfer(e)}}/>
//         <label htmlFor="root_A">A</label>
//         <input type="radio" id="root_Bb" name="root" value="Bb"onClick={e=>{transfer(e)}} />
//         <label htmlFor="root_Bb">Bb</label>
//         <input type="radio" id="root_B" name="root" value="B"  onClick={e=>{transfer(e)}}/>
//         <label htmlFor="root_B">B</label>
//         <input type="radio" id="root_C" name="root" value="C" onClick={e=>{transfer(e)}}/>
//         <label htmlFor="root_C">C</label>
//         <input type="radio" id="root_C#" name="root" value="C#" onClick={e=>{transfer(e)}} />
//         <label htmlFor="root_C#">C#</label>
//         <input type="radio" id="root_D" name="root" value="D" onClick={e=>{transfer(e)}} />
//         <label htmlFor="root_D">D</label>
//         <input type="radio" id="root_Eb" name="root" value="Eb" onClick={e=>{transfer(e)}} />
//         <label htmlFor="root_Eb">Eb</label>
//         <input type="radio" id="root_E" name="root" value="E" onClick={e=>{transfer(e)}} />
//         <label htmlFor="root_E">E</label>
//         <input type="radio" id="root_F" name="root" value="F"  onClick={e=>{transfer(e)}}/>
//         <label htmlFor="root_F">F</label>
//         <input type="radio" id="root_F#" name="root" value="F#"  onClick={e=>{transfer(e)}}/>
//         <label htmlFor="root_F#">F#</label>
//         <input type="radio" id="root_G" name="root" value="G" onClick={e=>{transfer(e)}} />
//         <label htmlFor="root_G">G</label>
//         <input type="radio" id="root_G#" name="root" value="G#" onClick={e=>{transfer(e)}} />
//         <label htmlFor="root_G#">G#</label>
//       </div>

//       <p>버튼을 더블클릭 하세요!</p>
//       <div className="container">
//           <img src={songList[select.selNo].score} alt="My Image" width="500px"/> 
//         {songList[select.selNo].chordArray.map((it,index) => (
//           <p key={index} className="chord" style={it.pos}>{chordOutput[index]}</p>
//         ))}
//       </div>

//     </div>
//   )
// }