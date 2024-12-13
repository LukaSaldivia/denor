import Filter from "./Filter.ts";

export default class NumberFilter<C extends string> extends Filter<C>{
  num = 0
  constructor(num : number, field : C, score? : number){
    super(field, score)
    this.num = num
  }

  get(){
      let cases : string[] = []
      cases.push(this._buildCaseQuery(this.num))
      cases.unshift("CASE WHEN 1=1 THEN 1 ELSE 0 END")
      return cases.join('+')
    
  }

  _buildCaseQuery(num : number){
    return `CASE WHEN ${String(this.field)} = ${num} THEN ${this.score} ELSE 0 END`
  }
}

