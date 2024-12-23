import { FilterOptions } from "../types/MVC-related-types.js";
import FilterFactory from "../utils/FilterFactory.js";
import Filter from "./Filter/Filter.js";

export default class SearchQueryHelper<C extends string>{

  columns : C[] = []
  filters : Filter<C>[] = []
  groups : string[] = []


  constructor(){
    // this.columns = columns
    // console.log(typeof columns);
    
  }

  appendFilter(options : FilterOptions<C>){
    this.filters.push(FilterFactory.createFilter(options))
    return this
  }

  groupBy(){
    return this
  }
}