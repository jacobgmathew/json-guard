import { failure, JSONGuard, success } from '../definition'
import { number } from './primitives'

export const array =
  <T>(guard: JSONGuard<T>, maxLength: number): JSONGuard<T[]> =>
  (x: unknown) => {
    if (!Array.isArray(x)) return failure('Not an array.')
    const xArr = x as unknown[]
    if (xArr.length > maxLength)
      failure(
        `Array length (${xArr.length}) is greater than maximum allowed length (${maxLength}).`,
      )
    const result: T[] = []
    for (const [i, x] of xArr.entries()) {
      const guardResult = guard(x)
      if (guardResult.error) {
        const indentedError = guardResult.message
          .split('\n')
          .map((x) => `    ${x}`)
          .join('\n')
        return failure(`At index ${i}:\n${indentedError}`)
      }
      result.push(guardResult.value)
    }
    return success(result)
  }

