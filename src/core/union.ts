import { failure, JSONGuard, success } from '../definition'
import { GuardToSuccessType } from '../utils'

export const union =
  <T extends JSONGuard<any>[]>(
    ...guards: T
  ): JSONGuard<GuardToSuccessType<T>[number]> =>
  (x: unknown) => {
    const messages = [] as string[]
    for (const [i, guard] of guards.entries()) {
      const currResult = guard(x)
      if (!currResult.error) return success(currResult.value)
      messages.push(...`Option ${i + 1}: ${currResult.message}`.split('\n'))
    }
    return failure(
      `Does not satisfy any type in the union: ${messages
        .map((x) => `    ${x}`)
        .join('\n')}`,
    )
  }
