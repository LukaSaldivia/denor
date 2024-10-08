import model from "../models/producto.model.js";
import Controller from "./Controller.js";

let controller = new Controller(model)

let req = {}

req.body = {
  "nombre%1" : "Salamin",
  "nombre%2" : "Mani Cervecero Clasico",
  "nombre%3" : "Papas clasicas",
}

console.log(await controller.createBundle(req))