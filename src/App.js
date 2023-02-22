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
    <div className="bg-img">
    <div className="disc">
      <h4>곡을 선택하세요</h4>
         <select onChange={handleSelect}>
          {songList.map((i) => (
            <option value={i.id} key={i.id}>
              {i.title}
            </option>
          ))}
        </select>
        </div>
        <div class="hr"></div>
      <SongContainer selSong={select} handler={handler}/>
      </div>
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
     <div class="hr"></div>
     <div className="switch-field">

          <input type ="radio" id={scale[0]} name="root" value={scale[0]} onChange={handler} checked={scale[0]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[0]}>{scale[0]}</label>
          <input type ="radio" id={scale[1]} name="root" value={scale[1]} onChange={handler} checked={scale[1]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[1]}>{scale[1]}</label>
          <input type ="radio" id={scale[2]} name="root" value={scale[2]} onChange={handler} checked={scale[2]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[2]}>{scale[2]}</label>
          <input type ="radio" id={scale[3]} name="root" value={scale[3]} onChange={handler} checked={scale[3]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[3]}>{scale[3]}</label>
          <input type ="radio" id={scale[4]} name="root" value={scale[4]} onChange={handler} checked={scale[4]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[4]}>{scale[4]}</label>
          <input type ="radio" id={scale[5]} name="root" value={scale[5]} onChange={handler} checked={scale[5]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[5]}>{scale[5]}</label>
          <input type ="radio" id={scale[6]} name="root" value={scale[6]} onChange={handler} checked={scale[6]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[6]}>{scale[6]}</label>
          <input type ="radio" id={scale[7]} name="root" value={scale[7]} onChange={handler} checked={scale[7]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[7]}>{scale[7]}</label>
          <input type ="radio" id={scale[8]} name="root" value={scale[8]} onChange={handler} checked={scale[8]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[8]}>{scale[8]}</label>
          <input type ="radio" id={scale[9]} name="root" value={scale[9]} onChange={handler} checked={scale[9]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[9]}>{scale[9]}</label>
          <input type ="radio" id={scale[10]} name="root" value={scale[10]} onChange={handler} checked={scale[10]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[10]}>{scale[10]}</label>
          <input type ="radio" id={scale[11]} name="root" value={scale[11]} onChange={handler} checked={scale[11]===selSong.rootkey ? true : false}/>
          <label htmlFor={scale[11]}>{scale[11]}</label>
          
            </div>

            <div class="hr"></div>
      <div className="container">
        <img src= {selSong.score} alt="Score" width="500px"/> 
        {selSong.chordArray.map((it,index) => (
          <p key={index} className="chord" style={it.pos}>{chordOut[index]}</p>
       ))}
     </div>
    </div>
  )
}