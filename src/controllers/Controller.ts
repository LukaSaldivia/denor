import Model from "../models/Model.js";
import { groupBy } from "../utils/anner.arrays.js";

class Controller<C extends string, PK extends C[]>{
  model : Model<C, PK>
  constructor(model : Model<C, PK>){
    this.model = model
  }

  // async createBundle(req : { body : object }, res){
  //   let {body} = req
  //   let bodyArr = Object.entries(body)

  //   let formated : Record<C, string | number>[] = []

  //   let groups = groupBy(bodyArr, (item : string)=>item[0].split('%')[1])


  //   for (const key in groups) {
  //     let entries = groups[key].map((entry : string) => [entry[0].split('%')[0], entry[1]])
  //     groups[key] = entries

  //     let obj : Record<C, string | number> = {}
      
  //     for (const entry of groups[key]) {
  //       obj[entry[0]] = entry[1]
  //     }
  //     formated.push(obj)
  //   }



  //   await this.model.createBundle(formated)


  //   return formated
    
  // }
}

export default Controller