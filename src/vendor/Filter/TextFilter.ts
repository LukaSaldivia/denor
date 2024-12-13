import { getAccumulated } from "../../utils/anner.arrays.js";
import Filter from "./Filter.ts";

export default class TextFilter<C extends string> extends Filter<C>{
  txt = ''
  constructor(txt = "", field : C){
    super(field)
    this.txt = txt
  }

  get(){
      let cases = getAccumulated(this.txt);
      cases = cases.map(txt => this._buildCaseQuery(txt))
      cases.unshift("CASE WHEN 1=1 THEN 1 ELSE 0 END")
      return cases.join('+')
    
  }

  _buildCaseQuery(txt : string){
    return `CASE WHEN LOWER(${String(this.field)}) LIKE LOWER('%${txt}%') THEN ${this.score} ELSE 0 END`
  }
}

