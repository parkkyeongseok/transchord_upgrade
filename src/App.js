import './App.css'
import React, { useState } from 'react';
import song1 from './score/song1.jpg'
import song2 from './score/song2.jpg'

export default function App() {
  const songList = [
    {
      id: 0,
      title: "가나다라마바사",
      rootkey: "A",
      artist: "아이자야",
      Tempo: "111, (4/4)",
      score: song1,
      chordArray: [
        { id: 1, pos: { left: "15px", top: "15px" }, chord: 1 },
        { id: 2, pos: { left: "30px", top: "30px" }, chord: 4 },
        { id: 3, pos: { left: "30px", top: "60px" }, chord: 5 }
      ]
    },
    {
      id: 1,
      title: "아자차카타파하",
      rootkey: "B",
      artist: "디사이플스",
      Tempo: "150, (6/8)",
      score: song2,
      chordArray: [
        { id: 1, pos: { left: "15px", top: "15px" }, chord: 1 },
        { id: 2, pos: { left: "30px", top: "30px" }, chord: 1 },
      ]
    },
    {
      id: 2,
      title: "내영혼",
      rootkey: "C",
      artist: "마커스",
      Tempo: "60, (4/4)",
      score: "img2",
      chordArray: [
        { id: 1, pos: { left: "15px", top: "15px" }, chord: 1 },
        { id: 2, pos: { left: "30px", top: "30px" }, chord: 1 },
      ]
    },
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
    copyChordNames.push(chordNames[0])
    copyChordNames.shift()
    }
      const chordObj={
      "1" : `${copyChordNames[0]}`,
      "2" : `${copyChordNames[2]}m<sup>7</sup>`,
      "3" : `${copyChordNames[0]}/${copyChordNames[4]}`,
      "4" : `${copyChordNames[5]}`,
      "5" : `${copyChordNames[7]}`,
      }
    
    chordOut=chordIn.map(chord=>{
    return chordObj[chord]})

    console.log(chordOut)
    setChordOutput(chordOut)
  }


  return (
    <div>
      {songList.map((it) => (
        <p key={it.id} value={it.id} onClick={() => { selSong(it.id) }} > {it.title}, artist : {it.artist} </p>))}
      <h3>곡번호 :{songList[select.selNo].id}</h3>
      <h3>곡명 : {songList[select.selNo].title}</h3>
      <h3>근음 : {songList[select.selNo].rootkey}</h3>

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
          <p key={it.id} className="chord" style={it.pos}>{chordOutput[index]}</p>
        ))}
      </div>

    </div>
  )
}