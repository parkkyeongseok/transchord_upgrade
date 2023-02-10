import './App.css'
import React, { useState, useEffect } from 'react';
import songdata00 from './songdata/songdata00'
import songdata01 from './songdata/songdata01'
import songdata02 from './songdata/songdata02'

export default function App() {
  const songList = [
    songdata00,
    songdata01,
    songdata02,
  ]

  const [select, setSelect] = useState({ selNo: 0 })

  const selSong = (e) => {
    setSelect({ selNo: e })
  }

//여기서부터는 루트키 변경 함수 작성

  const chordNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

  const [rootKey, setRootKey] =useState('C')
  let copyChordNames = []


  

  const chordIn = songList[select.selNo].chordArray.map(it=>{
    return it.chord
  })

  const [chordOutput, setChordOutput] =useState([])

  let chordOut = [] 

  const transfer = (e) => {
    setRootKey(e.target.value)

  
    copyChordNames = [...chordNames]

    let k = chordNames.indexOf(rootKey)
    for(let i =0; i<k; i++){
    copyChordNames.push(copyChordNames[0])
    copyChordNames.shift()
    }
    const chordObj={
      "1" : `${copyChordNames[0]}`,
      "2" : `${copyChordNames[2]}m7`,
      "3" : `${copyChordNames[0]}/${copyChordNames[4]}`,
      "4" : `${copyChordNames[5]}`,
      "5" : `${copyChordNames[7]}`,
      "5/4" : `${copyChordNames[7]}/${copyChordNames[5]}`,
      "5dom7" : `${copyChordNames[7]}7`,
      "5m" : `${copyChordNames[7]}m`,
      "6b" : `${copyChordNames[4]}7b9/${copyChordNames[8]}`,
      "6" : `${copyChordNames[9]}m7`,
      "7b" : `${copyChordNames[10]}`,
      "7bM7" : `${copyChordNames[10]}M7`,
      "7" : `${copyChordNames[7]}/${copyChordNames[11]}`,
      "4/1": `${copyChordNames[5]}/${copyChordNames[0]}`,
      "4/6": `${copyChordNames[5]}/${copyChordNames[9]}`,
      "5/1": `${copyChordNames[7]}/${copyChordNames[0]}`,
      "1/5": `${copyChordNames[0]}/${copyChordNames[7]}`,
      "7b/1": `${copyChordNames[10]}/${copyChordNames[0]}`,
      "3m" : `${copyChordNames[4]}m7`,
      "3m/5" : `${copyChordNames[4]}m/${copyChordNames[7]}`,
      "3dom7" : `${copyChordNames[4]}7`,
      "4/5" : `${copyChordNames[5]}/${copyChordNames[7]}`,
      "5b" : `${copyChordNames[2]}7/${copyChordNames[6]}`,
      "4m" : `${copyChordNames[5]}m6`,
      "4m/1" : `${copyChordNames[5]}m6/${copyChordNames[0]}`
  
      }

 
  console.log(copyChordNames)


    chordOut=chordIn.map(chord=>{
    return chordObj[chord]})

    console.log(chordOut)
    setChordOutput(chordOut)
  }



  return (
    <div>
      <div className="select-song">
      {songList.map((it,index) => (
        <a href="#!"> <p key={it.id} value={it.id} onClick={() => { selSong(it.id,) }} > {it.title} - {it.artist} </p></a>))} 
      </div>
      <div className="song-description"><p>ID :{songList[select.selNo].id}</p>
      <p>Title : {songList[select.selNo].title}</p>
      <p>Root : {songList[select.selNo].rootkey}</p>
      <p>Tempo : {songList[select.selNo].Tempo}</p>
      </div>
      <div className="switch-field">
        <input type="radio" id="root_A" name="root" value="A" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_A">A</label>
        <input type="radio" id="root_Bb" name="root" value="Bb" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_Bb">Bb</label>
        <input type="radio" id="root_B" name="root" value="B" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_B">B</label>
        <input type="radio" id="root_C" name="root" value="C" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_C">C</label>
        <input type="radio" id="root_C#" name="root" value="C#" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_C#">C#</label>
        <input type="radio" id="root_D" name="root" value="D" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_D">D</label>
        <input type="radio" id="root_Eb" name="root" value="Eb" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_Eb">Eb</label>
        <input type="radio" id="root_E" name="root" value="E" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_E">E</label>
        <input type="radio" id="root_F" name="root" value="F" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_F">F</label>
        <input type="radio" id="root_F#" name="root" value="F#" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_F#">F#</label>
        <input type="radio" id="root_G" name="root" value="G" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_G">G</label>
        <input type="radio" id="root_G#" name="root" value="G#" onClick={e=>{transfer(e)}} />
        <label htmlFor="root_G#">G#</label>
      </div>

      
      <div className="container">
          <img src={songList[select.selNo].score} alt="My Image" width="500px"/>
        {songList[select.selNo].chordArray.map((it,index) => (
          <p key={index} className="chord" style={it.pos}>{chordOutput[index]}</p>
        ))}
      </div>

    </div>
  )
}