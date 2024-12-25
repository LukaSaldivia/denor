import { Router } from 'express'
import MODELS from '../models/models.js'

const router = Router()

router.get('/', async(req, res) => {

MODELS.PRODUCTO.prepareSearch()
.appendFilter({
  field : "grupo",
  type : "text",
  value : "Aliger"
})
.appendFilter({
  field : 'nombre',
  type : 'text',
  value : "arra"
})

let results = await MODELS.PRODUCTO.search()

res.send(results)


})

export default router