import Filter from "./Filter.js";

export default class StrictTextFilter<C extends string> extends Filter<C>{
  txt = ''
  constructor(txt : string, field : C, score? : number){
    super(field, score)
    this.txt = txt
  }

  get(){
      let cases : string[] = []
      cases.push(this._buildCaseQuery(this.txt))
      cases.unshift(this.fallbackCase)
      return cases.join('+')
    
  }

  _buildCaseQuery(txt : string){
    return `CASE WHEN ${String(this.field)} = ${txt} THEN ${this.score} ELSE 0 END`
  }
}

