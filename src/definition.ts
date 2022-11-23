export type JSONGuardResult<To> =
  | { error: false; value: To; force: () => To }
  | { error: true; message: string; force: () => never }


export type JSONGuard<To, From = unknown> = (
  x: From,
) => JSONGuardResult<To>

export const success = <To>(value: To) => ({
  error: false as const,
  value,
  force: () => value,
})

export const failure = (message: string) => ({
  error: true as const,
  message,
  force: () => {
    throw new Error(message)
  },
})



