import { Router } from 'express'
import model from '../models/cliente.model.js'

const router = Router()

router.get('/', async(req, res) => {

//   model.newSearch()
// .appendFilter({
//   type : "range",
//   field : 'creado_el',
//   min : '2024-1-1',
//   max : '2024-11-11'
// })
// .appendFilter({
//   type : 'text',
//   field : 'nombre',
//   value : 'Melany',
//   score : 3
// })


// let [results] = await model.executeSearch(1, {
//   sortBy : [
//     {
//       field : 'nombre',
//       order : 'DESC'
//     }
//   ]
// })
// res.send(results)

res.send(model.joins)



})

export default router