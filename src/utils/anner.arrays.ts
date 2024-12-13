

function getAccumulated(txt : string) : string[] {
  let acc : string[] = []
  let spl = txt.split('')
  
  for(let i = 0; i< spl.length ; i++){
      acc.push(spl.slice(0,i+1).join(''))
  }
  
  return acc
}

function groupBy<T>(arr : T[], fn : Function) : { any : T[]} | {} {
  let grouped = {}
  for(let item of arr){
    grouped[fn(item)] = [...(grouped[fn(item)] || []), item]
  }

  return grouped
}


export { getAccumulated, groupBy }