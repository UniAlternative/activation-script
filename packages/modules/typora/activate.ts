import { ResponseDone, base64Encode, destr } from '@as/shared'

/**
 * @url https://dian.typora.com.cn/api/client/activate
 */
export function TyporaActivate() {
  console.log($request)
  /**
   * @body
      @"license"：许可码。
      @"email"：邮箱地址。
      @"l"：设备标签（通过调用[r12 deviceLabel]获取）。
      @"f"：指纹（通过调用[r12 fingerPrintNew]获取）。
      @"u"：用户ID（通过调用[[Setting sharedInstance] getUserId]获取）。
      @"force"：是否强制激活的标志（转换为NSNumber对象）。
      @"type"：类型（空字符串）。
   */
  const body = destr($request.body) as {
    l: string // <computer_name> | <user name> | macOS
    u: string // UUID(?)
    force: boolean // false
    v: string // Version (macOS|<version>)
    email: string
    license: string
    type: string // ""
    f: string // <fingerprint>
  }
  const deviceId = body.u
  const fingerprint = body.f
  const email = body.email
  // const license = 'A4K4BU-YZN93P-83FRGQ-F3Y6FP'
  const license = body.license
  const version = body.v
  const force = body.force
  const type = body.type
  const date = new Date().toLocaleDateString('en-US')

  const msg = {
    deviceId,
    fingerprint,
    email,
    license,
    version,
    force,
    type,
    date,
  }

  return ResponseDone({
    body: {
      code: 1,
      msg: base64Encode(JSON.stringify(msg)),
      // msg: $request.body,
    },
  })
}
