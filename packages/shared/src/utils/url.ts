export function parseURLParams(url: string) {
  const params = url.split('?')[1]
  const result: { [key: string]: string } = {}
  if (params) {
    const pairs = params.split('&')
    for (const pair of pairs) {
      const [key, value] = pair.split('=')
      result[key] = value
    }
  }
  return result
}

export function parseURL(url: string) {
  const [path, params] = url.split('?')
  return { path, params: parseURLParams(params) }
}
