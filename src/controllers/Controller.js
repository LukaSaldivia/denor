import Model from "../models/Model.js";
import anner from "../utils/anner.arrays.js";

class Controller{
  constructor(model = Model){
    this.model = model
  }

  async createBundle(req,res){
    let {body} = req
    body = Object.entries(body)

    let formated = []

    let groups = anner.groupBy(body, (item)=>item[0].split('%')[1])


    for (const key in groups) {
      let entries = groups[key].map(entrie => [entrie[0].split('%')[0], entrie[1]])
      groups[key] = entries

      let obj = {}
      
      for (const entry of groups[key]) {
        obj[entry[0]] = entry[1]
      }
      formated.push(obj)
    }



    await this.model.createBundle(formated)


    return formated
    
  }
}

export default Controller