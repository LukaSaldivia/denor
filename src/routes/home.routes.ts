import { Router } from 'express'
import model from '../models/usuario.model.js'

const router = Router()

router.get('/', async(req, res) => {

  model.prepareSearch()
.appendFilter({
  field : "nombre",
  type : "text",
  value : "",
  score : 9
  
})


let [results] = await model.search(0, {
  sortBy : [
    {
      field : 'nombre',
      order : 'DESC'
    }
  ]
})
res.send(results)


})

export default router