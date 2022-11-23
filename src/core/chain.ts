import { JSONGuard, success } from '../definition'

export function chain<T0, T1 extends T0, T2 extends T1>(
  ...tests: [JSONGuard<T1, T0>, JSONGuard<T2, T1>]
): JSONGuard<T2, T0>
export function chain<T0, T1 extends T0, T2 extends T1, T3 extends T2>(
  ...tests: [JSONGuard<T1, T0>, JSONGuard<T2, T1>, JSONGuard<T3, T2>]
): JSONGuard<T3, T0>
export function chain<T0, T1 extends T0, T2 extends T1, T3 extends T2>(
  ...tests: [JSONGuard<T1, T0>, JSONGuard<T2, T1>, JSONGuard<T3, T2>]
): JSONGuard<T3, T0>
export function chain<
  T0,
  T1 extends T0,
  T2 extends T1,
  T3 extends T2,
  T4 extends T3,
>(
  ...tests: [
    JSONGuard<T1, T0>,
    JSONGuard<T2, T1>,
    JSONGuard<T3, T2>,
    JSONGuard<T4, T3>,
  ]
): JSONGuard<T4, T0>
export function chain(...guards: JSONGuard<unknown>[]) {
  return (x: unknown) => {
    let value: unknown = x
    for (const guard of guards) {
      const currResult = guard(value)
      if (currResult.error) return currResult
      value = currResult.value
    }
    return success(value)
  }
}
