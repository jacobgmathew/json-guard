import { JSONGuard } from './definition'

export type GuardToSuccessType<Type> = {
  [Property in keyof Type]: Type[Property] extends JSONGuard<infer To>
    ? To
    : never
}
