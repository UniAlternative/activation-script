import crypto from 'node:crypto'
import { Buffer } from 'node:buffer'

const sha256 = crypto.createHash('sha256')

function _makeHash(...args: string[]) {
  args.forEach((arg) => {
    sha256.update(arg)
  })
  return sha256.digest('base64')
}
// console.log(
//   _makeHash(v4(), 'typora')
//     .substr(0, 10)
//     .replace(/[/=+-]/g, 'a'),
// )

function _genMsg(str: string) {
  return Buffer.from(str).toString('base64')
}
