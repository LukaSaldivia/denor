import { Router } from 'express'
import MODELS from '../models/models.js'

const router = Router()

router.get('/', async(req, res) => {

//   MODELS.CLIENTE.prepareSearch()
// .appendFilter({
//   field : "vendedor",
//   type : "text",
//   value : "",
//   score : 9
  
// })


// let [results] = await MODELS.CLIENTE.search(0, {
//   sortBy : [
//     {
//       field : 'relevance',
//       order : 'DESC'
//     }
//   ]
// })
// res.send(results)

MODELS.ROL.prepareSearch()
.appendFilter({
  field : 'nombre',
  type : 'text',
  value : 'admIni'
})


let [results] = await MODELS.ROL.search()

res.send(results)


})

export default router