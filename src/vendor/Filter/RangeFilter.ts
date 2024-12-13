import Filter from "./Filter.ts";

export default class RangeFilter<C extends string> extends Filter<C>{
  min : string | number
  max : string | number
  constructor(min : string | number, max : string | number, field : C, score? : number){
    super(field, score)
    this.min = min
    this.max = max
  }

  get(){
      let cases : string[] = []
      cases.push(this._buildCaseQuery(this.min, this.max))
      cases.unshift("CASE WHEN 1=1 THEN 1 ELSE 0 END")
      return cases.join('+')
    
  }

  _buildCaseQuery(min : string | number, max : string | number){
    return `CASE WHEN ${String(this.field)} BETWEEN %${min}% AND ${max} THEN ${this.score} ELSE 0 END`
  }
}

