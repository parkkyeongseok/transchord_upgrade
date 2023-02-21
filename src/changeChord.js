
const changeChord= (rootScale) => {

const chordObj={
        "1" : `${rootScale[0]}`,
        "2b" : `${rootScale[9]}7/${rootScale[1]}`,
        "2" : `${rootScale[2]}m7`,
        "3" : `${rootScale[0]}/${rootScale[4]}`,
        "4" : `${rootScale[5]}`,
        "5" : `${rootScale[7]}`,
        "5/4" : `${rootScale[7]}/${rootScale[5]}`,
        "5dom7" : `${rootScale[7]}7`,
        "5m" : `${rootScale[7]}m`,
        "6b" : `${rootScale[4]}7b9/${rootScale[8]}`,
        "6" : `${rootScale[9]}m7`,
        "7b" : `${rootScale[10]}`,
        "7bM7" : `${rootScale[10]}M7`,
        "7" : `${rootScale[7]}/${rootScale[11]}`,
        "4/1": `${rootScale[5]}/${rootScale[0]}`,
        "4/6": `${rootScale[5]}/${rootScale[9]}`,
        "5/1": `${rootScale[7]}/${rootScale[0]}`,
        "1/5": `${rootScale[0]}/${rootScale[7]}`,
        "7b/1": `${rootScale[10]}/${rootScale[0]}`,
        "3m" : `${rootScale[4]}m7`,
        "3m/5" : `${rootScale[4]}m/${rootScale[7]}`,
        "3dom7" : `${rootScale[4]}7`,
        "4/5" : `${rootScale[5]}/${rootScale[7]}`,
        "5b" : `${rootScale[2]}7/${rootScale[6]}`,
        "4m" : `${rootScale[5]}m6`,
        "4m/1" : `${rootScale[5]}m6/${rootScale[0]}`
    
        }
return chordObj
}
  
export default changeChord;