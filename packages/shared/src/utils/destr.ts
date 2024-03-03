export function destr<T>(str: string): T {
  try {
    return JSON.parse(str) as T
  }
  catch (e) {
    return str as unknown as T
  }
}
