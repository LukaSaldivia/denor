export default abstract class Filter<C extends string>{
  field : C
  score : number
  constructor(field : C, score? : number){
    this.field = field
    this.score = score || 1
  }

  abstract get() : string
}