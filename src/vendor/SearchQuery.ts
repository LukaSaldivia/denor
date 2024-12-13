import Filter from "./Filter/Filter.ts";
import { FilterOptions } from "../types/MVC-related-types.ts";

import RangeFilter from "./Filter/RangeFilter.ts";
import TextFilter from "./Filter/TextFilter.ts";
import DateFilter from "./Filter/DateFilter.ts";
import NumberFilter from "./Filter/NumberFilter.ts";


export default class SearchQuery<C extends string>{
  filters : Filter<C>[]
  map = {
    "range" : (options : FilterOptions<C>) : Filter<C> => {
      if (options.type != 'range') {
        throw new Error()
      }
      return new RangeFilter<C>(options.min, options.max, options.field)
    },
    "text" : (options : FilterOptions<C>) : Filter<C> => {
      if (options.type != 'text') {
        throw new Error()
      }
      return new TextFilter<C>(options.value, options.field)
    },
    "date" : (options : FilterOptions<C>) : Filter<C> => {
      if (options.type != 'date') {
        throw new Error()
      }
      return new DateFilter<C>(options.value, options.field)
    },
    "number" : (options : FilterOptions<C>) : Filter<C> => {
      if (options.type != 'number') {
        throw new Error()
      }
      return new NumberFilter<C>(options.value, options.field)
    },
    
  }

  appendFilter(options : FilterOptions<C>){
    let filter : Filter<C> = this.map[options.type](options)
    this.filters.push(filter)
    return this
  }
}