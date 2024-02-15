export function parseURLParams(url: string) {
  const urlObj = new URL(url)
  const searchParams = urlObj.searchParams
  const obj: Record<string, string> = {}
  for (const [key, value] of searchParams)
    obj[key] = value

  return obj
}

export function parseURL(url: string) {
  const urlObj = new URL(url)
  return {
    host: urlObj.host,
    path: urlObj.pathname,
    query: parseURLParams(url),
  }
}
