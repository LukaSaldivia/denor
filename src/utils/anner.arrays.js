let anner = {}

anner.getAccumulated = function (txt = "") {
  let acc = []
  let spl = txt.split('')
  
  for(let i = 0; i< spl.length ; i++){
      acc.push(spl.slice(0,i+1).join(''))
  }
  
  return acc
}

anner.groupBy = function(arr = [], fn){
  let grouped = {}
  for(let item of arr){
    grouped[fn(item)] = [...(grouped[fn(item)] || []), item]
  }

  return grouped
}


export default anner