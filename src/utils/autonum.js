export default autonum = function*(){
  let n = 1;
  while (true) {
    yield n
    n++
  }
}