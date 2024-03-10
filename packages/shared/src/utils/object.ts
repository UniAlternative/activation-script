export function getDeepKeyInAnObject(obj: any, key: string) {
  return key.split('.').reduce((o, i) => o[i], obj)
}

export function transformToString(obj: any) {
  if (typeof obj === 'object')
    return JSON.stringify(obj)

  return obj
}
