import { _Error } from "../errors/EError.js";

export default async function catchError<T>(
  promise : Promise<T>
  ){
    return promise
    .then(data => {
      return [undefined, data] as [undefined, T]
    })
    .catch(error => {
      return [error]
    })
}