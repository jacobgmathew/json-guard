import { failure, JSONGuard, success } from '../definition'

export const string: JSONGuard<string> = (x: unknown) =>
  typeof x === 'string' ? success(x) : failure('Not a string.')

export const number: JSONGuard<number> = (x: unknown) =>
  typeof x === 'number' ? success(x) : failure('Not a number.')

export const boolean: JSONGuard<boolean> = (x: unknown) =>
  typeof x === 'boolean' ? success(x) : failure('Not a boolean.')

export const constant =
  <T extends number | string | null | boolean>(c: T): JSONGuard<T> =>
  (x: unknown) =>
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    x === c ? success(x as T) : failure(`Not ${c}.`)
