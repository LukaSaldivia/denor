import Filter from "./Filter.js";

export default class DateFilter<C extends string> extends Filter<C> {
  date: string;

  constructor(date: string, field: C) {
    super(field);
    this.date = date;
  }

  get() {
    let cases: string[] = [];
    cases.push(this._buildCaseQuery(this.date));
    cases.unshift("CASE WHEN 1=1 THEN 1 ELSE 0 END");
    return cases.join('+');
  }

  _buildCaseQuery(date: string) {
    return `CASE WHEN ${String(this.field)} = '${date}' THEN ${this.score} ELSE 0 END`;
  }
}