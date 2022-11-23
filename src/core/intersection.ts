import { failure, JSONGuard, success } from '../definition'

export function intersection<T1, T2>(
  ...tests: [JSONGuard<T1>, JSONGuard<T2>]
): JSONGuard<T1 & T2>
export function intersection<T1, T2, T3>(
  ...tests: [JSONGuard<T1>, JSONGuard<T2>, JSONGuard<T3>]
): JSONGuard<T1 & T2 & T3>
export function intersection<T1, T2, T3, T4>(
  ...tests: [JSONGuard<T1>, JSONGuard<T2>, JSONGuard<T3>, JSONGuard<T4>]
): JSONGuard<T1 & T2 & T3 & T4>
export function intersection<T1, T2, T3, T4, T5>(
  ...tests: [
    JSONGuard<T1>,
    JSONGuard<T2>,
    JSONGuard<T3>,
    JSONGuard<T4>,
    JSONGuard<T5>,
  ]
): JSONGuard<T1 & T2 & T3 & T4 & T5>
export function intersection(...guards: unknown[]) {
  return (x: unknown) => {
    let result: any = {}
    for (const guard of guards) {
      const currResult = (guard as any)(x)
      if (currResult.error) return failure(currResult.message)
      result = { ...result, ...currResult.value }
    }
    return success(result)
  }
}
