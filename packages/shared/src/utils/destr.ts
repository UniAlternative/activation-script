export function destr<T>(str: string): T {
  if (typeof str !== 'string') {
    return str as unknown as T
  }
  try {
    return JSON.parse(str) as T
  }
  catch (e) {
    return str as unknown as T
  }
}
