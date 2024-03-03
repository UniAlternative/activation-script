export function getDeepKeyInAnObject(obj: any, key: string) {
  return key.split('.').reduce((o, i) => o[i], obj)
}
