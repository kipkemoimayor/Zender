import type { HookContext } from '../declarations'

export const discardData = async (context: HookContext) => {
  const { data, additionalData } = context

  for (let i in data) {
    if (i in additionalData) {
      delete data[i]
    }
  }

  context.data = data
}
