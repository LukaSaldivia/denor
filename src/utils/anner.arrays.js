let anner = {}

anner.getAccumulated = function (txt) {
  let acc = []
  let spl = txt.split('')
  
  for(let i = 0; i< spl.length ; i++){
      acc.push(spl.slice(0,i+1).join(''))
  }
  
  return acc
}

export default anner