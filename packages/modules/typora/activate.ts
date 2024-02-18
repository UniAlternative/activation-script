import { base64Encode, buildResponse, destr, v4 } from '@as/shared'

/**
 * @url https://dian.typora.com.cn/api/client/activate
 */
export function TyporaActivate() {
  console.log($request)
  const body = destr($request.body) as {
    l: string // <computer_name> | <user name> | macOS
    u: string // UUID(?)
    force: boolean // false
    v: string // Version (macOS|<version>)
    email: string
    license: string
    type: string // ""
    f: string // ?(fingerprint?)
  }
  const deviceId = body.u
  const fingerprint = body.f
  const email = body.email
  // const license = 'A4K4BU-YZN93P-83FRGQ-F3Y6FP'
  const license = body.license
  const version = body.v
  const date = new Date().toLocaleDateString('en-US')

  const msg = {
    deviceId,
    fingerprint,
    email,
    license,
    version,
    date,
  }

  buildResponse({
    body: {
      code: 0,
      msg: base64Encode(JSON.stringify(msg)),
    },
  })
}
