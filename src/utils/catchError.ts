import { _Error } from "../errors/EError";

export default async function catchError<T, _Error>(
  promise : Promise<T>, 
  errorsToCatch? : _Error[]
  ){
    return promise
    .then(data => {
      return [undefined, data] as [undefined, T]
    })
    .catch(error => {
      if (errorsToCatch == undefined) {
        return [error]
      }

      if (errorsToCatch.some(e => error instanceof _Error)) {
        return [error]
      }

      throw error
    })
}