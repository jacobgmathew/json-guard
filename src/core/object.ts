import { failure, JSONGuard, JSONGuardResult, success } from '../definition'
import { GuardToSuccessType } from '../utils'

export const object =
  <O extends Record<string, JSONGuard<unknown>>>(
    guardObject: O,
    mode: 'noExtraKeys' | 'extraKeysOk' = 'noExtraKeys',
  ) =>
  (x: unknown): JSONGuardResult<GuardToSuccessType<O>> => {
    if (typeof x !== 'object' || Array.isArray(x) || x === null)
      return failure('Not an object.')
    const guardKeys = Object.getOwnPropertyNames(guardObject)
    const inputKeys = Object.getOwnPropertyNames(x)

    // Check for missing keys.
    const missingKeys = new Set(guardKeys)
    inputKeys.forEach((x) => missingKeys.delete(x))
    if (missingKeys.size > 0) {
      return failure(
        `Missing ${missingKeys.size === 1 ? 'property' : 'properties'} ${[
          ...missingKeys.values(),
        ]
          .map((x) => `"${x}"`)
          .join(', ')}.`,
      )
    }

    if (mode === 'noExtraKeys') {
      // Check for extra keys.
      const extraKeys = new Set(inputKeys)
      guardKeys.forEach((x) => extraKeys.delete(x))
      if (extraKeys.size > 0) {
        return failure(
          `Extra ${
            extraKeys.size === 1 ? 'property' : 'properties'
          } ${[...extraKeys.values()].map((x) => `"${x}"`).join(', ')}.`,
        )
      } 
    }

    const xObject = x as Record<string, unknown>
    const result: any = {}
    for (const key of guardKeys) {
      const currResult = guardObject[key]!(xObject[key])
      if (currResult.error) {
        return failure(`${key}: ${currResult.message}`)
      }
      result[key] = currResult.value
    }

    return success(result)
  }

