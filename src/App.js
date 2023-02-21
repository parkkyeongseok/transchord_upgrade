import './App.css'
import React, { useEffect, useState } from 'react';
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
    {...songList[0]}
    )

  const handleSelect = (e) => {
    console.log(e.target.value);
    let found = songList.find(i=>i.id === Number(e.target.value))
    setSelect(select=>({...select,...found}))
  };

    //자식에게 전달할 함수
  const handler =(e) =>
  { 
    setSelect(select =>({...select,rootkey: e.target.value}))

    console.log(e.target.value)
  }

  return (
    <>
    <div className="disc">
      <p>곡을 선택하세요!</p>
         <select onChange={handleSelect}>
          {songList.map((i) => (
            <option value={i.id} key={i.id}>
              {i.title}
            </option>
          ))}
        </select>
        </div>
      <SongContainer selSong={select} handler={handler}/>
    </>
  )

}

//song container 컴포넌트

const SongContainer = ({selSong, handler}) => {
  //곡 내부 입력 코드 배열화  ---1 인자
  const chordIn = selSong.chordArray.map(i=>i.chord)
  console.log('chordIn: ', chordIn)

  //나중에 버튼 만들기 위한 배열
    const scale = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
  
  //근음과 스케일을 넣으면 근음을 기준으로 한 '루트기준스케일'로 되돌려주는 함수.   --2인자
  const changeScale = (root)=>{
    const tempScale = [...scale]
    let k = tempScale.indexOf(root)
      for(let i =0; i<k; i++){
        tempScale.push(tempScale[0])
        tempScale.shift()
      }
      return tempScale
  }

  console.log('chordScale: ', changeScale(selSong.rootkey))

  //'루트기준 스케일'과 '곡내부 입력코드 배열'을 넣으면, '변환 후 코드배열'을 출력해주는는 함수.   --1 인자와 --2 인자를 매개변수로 받는 함수. 
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

      <div className="disc">
     <h4>곡명 : {selSong.title}</h4>
     <h4>템포 : {selSong.tempo}</h4>
     <h4>근음 : {selSong.rootkey}</h4>
     </div>

     <div className="switch-field">

     {scale.map(i=> {
            return (
                <input type ="radio" key={i} id={i} name="root" value={i} onChange={handler} /> )
            }
     )}
            {scale.map(i=> <label htmlFor={i} key={i}>{i}</label>)}
            </div>

      <div className="container">
        <img src= {selSong.score} alt="Score" width="500px"/> 
        {selSong.chordArray.map((it,index) => (
          <p key={index} className="chord" style={it.pos}>{chordOut[index]}</p>
       ))}
     </div>
    </div>
  )
}