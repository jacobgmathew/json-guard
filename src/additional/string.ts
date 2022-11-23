import { failure, JSONGuard, success } from '../definition'

export const trimmed: JSONGuard<string, string> = (x: string) =>
  x.trim().length === x.length ? success(x) : failure('Not trimmed.')

export const bounded =
  (maxLength: number): JSONGuard<string, string> =>
  (x: string) =>
    x.length <= maxLength ? success(x) : failure(`Longer than ${maxLength}.`)
