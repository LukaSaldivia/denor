export default abstract class Filter<C extends string>{
  field : C
  score = 1
  constructor(field : C){
    this.field = field
  }

  abstract get() : string
}