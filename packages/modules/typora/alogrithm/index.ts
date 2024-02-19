function gen(): string {
  const chars: string = 'L23456789ABCDEFGHJKMNPQRSTUVWXYZ'
  const maxPos: number = chars.length
  let serial: string = ''
  for (let i: number = 0; i < 22; i++)
    serial += chars.charAt(Math.floor(Math.random() * maxPos))

  serial += ((e: string): string => {
    let t: string = ''
    for (let i: number = 0; i < 2; i++) {
      let a: number = 0
      for (let s: number = 0; s < 16; s += 2)
        a += chars.indexOf(e[i + s])

      t += chars[a %= chars.length]
    }
    return t
  })(serial)
  return `${serial.slice(0, 6)}-${serial.slice(6, 12)}-${serial.slice(12, 18)}-${serial.slice(18, 24)}`
}
console.log(gen())
