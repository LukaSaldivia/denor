import anner from "../../utils/anner.arrays.js";
import Filter from "./Filter.js";

export default class TextFilter extends Filter{
  constructor(txt = "", field = "", exclusive = false){
    super(exclusive)
    this.txt = txt
    this.field = field;
  }

  get(){
    if (this.exclusive) {
      return `${this.field} = '${this.txt}'`
    }else{
      let cases = anner.getAccumulated(this.txt);
      cases = cases.map(txt => this._buildCaseQuery(txt))
      cases.unshift("CASE WHEN 1=1 THEN 1 ELSE 0 END")
      return cases.join('+')
    }
  }

  _buildCaseQuery(txt){
    return `CASE WHEN LOWER(${this.field}) LIKE LOWER('%${txt}%') THEN 1 ELSE 0 END`
  }
}

