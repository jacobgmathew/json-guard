import { constant } from '../core/primitives'
import { union } from '../core/union'
import { failure, JSONGuard, JSONGuardResult, success } from '../definition'

export const nullable = <T>(x: JSONGuard<T>): JSONGuard<T | null> =>
  union(constant(null), x)

export const json: JSONGuard<any, string> = (x: string) => {
  try {
    return success(JSON.parse(x))
  } catch (e) {
    return failure('Not a valid JSON string.')
  }
}

export const ignore =
  <T>(x: T) =>
  (_: unknown): JSONGuardResult<T> =>
    success(x)
