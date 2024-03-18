export function parseURLParams(url: string) {
  const params = url.split('?')[1]
  const result: { [key: string]: string } = {} as any
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
  if (!url.includes('?'))
    return { path: url, params: {} }
  const [_url] = url.split('?')
  return { url: _url, params: parseURLParams(url), raw: url }
}
