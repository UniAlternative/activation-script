export function destr(str: string) {
  try {
    return JSON.parse(str)
  }
  catch (e) {
    return str
  }
}