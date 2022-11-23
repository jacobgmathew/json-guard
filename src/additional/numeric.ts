import { failure, JSONGuard, success } from '../definition'

export const lte =
  (max: number): JSONGuard<number, number> =>
  (x: number) =>
    x <= max ? success(x) : failure(`Greater than ${max}.`)

export const gte =
  (min: number): JSONGuard<number, number> =>
  (x: number) =>
    x >= min ? success(x) : failure(`Less than ${min}.`)

export const lt =
  (max: number): JSONGuard<number, number> =>
  (x: number) =>
    x < max ? success(x) : failure(`Greater than or equal to ${max}.`)

export const gt =
  (min: number): JSONGuard<number, number> =>
  (x: number) =>
    x > min ? success(x) : failure(`Less than or equal to ${min}.`)

export const inRange = (
  x: number,
  y: number,
  type: 'inclusive' | 'exclusive' | 'excludeMin' | 'excludeMax',
): JSONGuard<number, number> => {
  const min = Math.min(x, y)
  const max = Math.max(x, y)
  const minIsIncluded = type === 'inclusive' || type === 'excludeMin'
  const maxIsIncluded = type === 'inclusive' || type === 'excludeMax'
  const errorMessage = `Not in range ${
    minIsIncluded ? '[' : '('
  }${min}, ${max}${maxIsIncluded ? ']' : ')'}.`
  return (x: number) => {
    const minIsOk = minIsIncluded ? x >= min : x > min
    const maxIsOk = maxIsIncluded ? x <= max : x > max
    return minIsOk && maxIsOk ? success(x) : failure(errorMessage)
  }
}

export const integer: JSONGuard<number, number> = (x: number) =>
  Number.isInteger(x) ? success(x) : failure(`Not an integer.`)
