import { ResponseDone } from '@as/shared'

/**
 * @url https://b.kerlig.local/api/v1/license
 *
 * @description Activate Kerlig license
 *
 * In fact... You can... run following command to activate Kerlig license. and then enter LemonSqueezy license key.
```bash
sed -i '' 's/async function g(e,t){/async function g(e,t){return{status:200,body:{}};/g' /Applications/Kerlig.app/Contents/Resources/app/.webpack/main/index.js
```
 */
export function kerLigActivate() {
  return ResponseDone({
    headers: {
      status: '200',
    },
  })
}
