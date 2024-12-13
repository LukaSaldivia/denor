import { Router } from 'express'
import model from '../models/usuario.model.js'

const router = Router()

router.get('/', async(req, res) => {

  model.newSearch()
.appendFilter({
  type : "text",
  field : 'nombre',
  value : 'Melany'
})
.appendFilter({
  type : 'date',
  field : 'creado_el',
  value : '2024-12-12'
})

let [results] = await model.executeSearch(1)
res.send(results)

})

export default router