export function base64Encode(str: string) {
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let result = ''
  let i = 0
  do {
    const a = str.charCodeAt(i++)
    const b = str.charCodeAt(i++)
    const c = str.charCodeAt(i++)
    a ? result += base64Chars[a >> 2] : result += '='
    a ? result += base64Chars[(a & 3) << 4 | (b >> 4)] : result += '='
    b ? result += base64Chars[(b & 15) << 2 | (c >> 6)] : result += '='
    c ? result += base64Chars[c & 63] : result += '='
  } while (i < str.length)
  return result
}

export function base64Decode(str: string) {
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let result = ''
  let i = 0
  while (i < str.length) {
    const a = base64Chars.indexOf(str[i++])
    const b = base64Chars.indexOf(str[i++])
    const c = base64Chars.indexOf(str[i++])
    const d = base64Chars.indexOf(str[i++])
    result += String.fromCharCode(a << 2 | b >> 4)
    if (c !== -1)
      result += String.fromCharCode((b & 15) << 4 | c >> 2)
    if (d !== -1)
      result += String.fromCharCode((c & 3) << 6 | d)
  }
  return result
}
