# Activation Script

Activation Script 是一个旨在生成配置文件和激活软件许可证的脚本。这些配置文件和脚本用于拦截和操作各种应用程序提出的网络请求，允许您通过不同服务自动激活软件许可证。基于 [Surge](https://nssurge.com/)

<pre align="center">
🧪 Working in Progress
</pre>

## Supported Activation Services

目前支持以下激活服务：

- [x] LemonSqueezy
- [x] Paddle
- [x] Gumroad

## Supported Activation Applications

目前支持以下应用程序：

- [x] Screen Studio (LemonSqueezy) `🪄 Stable` - [特殊说明 - Screen Studio](#screen-studio)
- [x] AlDente Pro (Paddle) `🪄 Stable`
- [x] MediaMate (Gumroad) `🪄 Stable` - [特殊说明 - MediaMate](#mediamate)
- [x] Spotify (仅移除音频广告，你可以使用 AdBlock 等工具屏蔽 HTML 广告) `🧪 Beta`
- [ ] ~~Raycast Pro Plan **(Without Pro plan features)**~~ - [特殊说明 - Raycast Pro Plan](#raycast-pro-plan)
- [x] Elpass **(你需要与 [QiuChenlyOpenSource/InjectLib](https://github.com/QiuChenlyOpenSource/InjectLib) 搭配使用)**


## 安装

Activation Script 不提供已编译的脚本和配置文件，您需要自行构建。

### 构建 Activator

1. 打开终端并克隆此项目至某一目录。

2. 使用以下命令运行脚本：


   ```shell
   pnpm i
   pnpm generate gen
   ```

   这个命令会生成两个重要的配置部分：MITM（中间人）和 Script（在 `activator.conf` 文件中）。这些部分由 Surge 用于拦截和操作网络请求。

3. 复制生成的 MITM 和 Script 部分到 Surge 配置文件中。（MITM 部分只需要修改 `hostname`）

4. 配置 Surge 使用经过修改的配置文件。

5. 使用以下命令构建 Activator 并将其复制到 Surge 配置文件所在的目录中：

   ```shell
   pnpm generate inject
   ```

现在，Surge 将拦截特定的网络请求，并在触发时执行激活函数。

### 进阶

你可以使用以下命令快速修补 Surge 配置文件：

```shell
pnpm generate patch
```

> [!WARNING]
> 此命令会直接覆盖 Surge 配置文件中的 Script 部分，如果你先前已经修改过 Script 部分，请先备份 Surge 配置文件。

## 特殊说明

### Screen Studio

许可证格式为：`XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`，你甚至可以直接复制这个格式的许可证到剪贴板，然后打开 Screen Studio，它是可以激活的。

但是这里还是给几个乱算的激活码吧：

```
2032cb31-c7ff-477e-a96b-35b0db7cb546
05242e4d-8e31-42db-9934-0683809c5a2a
33b47128-e803-460a-8efe-293bbf1f6ce5
fa98d84a-99d4-49e8-9840-2a3511970529
285e1e11-d9c6-417c-b0ee-6f3c4853f8d8
```

<details>
  <summary>Algorithm</summary>

```js
function generateUUID() {
  const characters = '0123456789abcdef';
  let uuid = '';

  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else if (i === 14) {
      uuid += '4';
    } else if (i === 19) {
      uuid += characters[(Math.floor(Math.random() * 4) + 8)];
    } else {
      uuid += characters[Math.floor(Math.random() * 16)];
    }
  }

  return uuid;
}
```
  
</details>

### MediaMate

> Thanks to @QiuchenlyOpenSource & @Qiuchenly.

```
MNBVCXZLK-QWERTYUIO-ASDFHJKLZ-XCVBN
85DB562A-C11D4B06-A2335A6B-8C079166
ZTVKHMKYQ-JKDOSLFZU-UIXXTKLBA-HVNEZ
55277020-CAZNWFKK-97392017-MROIOCVV
WKMCDMKQS-RKLZHNWTW-OBLLJBZAX-VCEKT
94389301-ICWINLVW-35507779-OXCCQXLN
IXNIVXJUC-ZODUBIVHS-XNRCXLQVM-FVDHC
43378717-DHAMJHWK-86941225-DTMNMZRE
ZCJJBTBBT-XXTCCSCZT-XMVQQXQXL-ZVOZI
88079719-BONJCJQC-43235799-SODXFXIZ
IFZONWUNB-OWLYVQKQB-YFNIKSXBS-MCLRA
41389661-TLSYJYTE-32625842-BLCVBKVK
```

### Raycast Pro Plan

> Thanks to @zhuozhiyongde.

为了可以正常使用 Raycast Pro Plan，你需要在 `Surge -> HTTP -> 捕获 -> 捕获 MITM 覆写` 中修改 MITM 主机名，将最后一行 `*` 取消勾选。

> [!WARNING]
> 由于 Surge 限制，在 Surge 内的 runtime 做脚本无法实现 SSE，这对体验有很大很大的影响，以及还有一些实现上的问题，因此我打算不做内置的 AI 支持了

如果想使用此功能，建议参考以下项目搭建自己的后端服务进行体验：

- [zhuozhiyongde/Unlocking-Raycast-With-Surge](https://github.com/zhuozhiyongde/Unlocking-Raycast-With-Surge)
- [wibus-wee/raycast-unblock](https://github.com/wibus-wee/raycast-unblock)
- [yufeikang/raycast_api_proxy](https://github.com/yufeikang/raycast_api_proxy)

另外，你可能还需要前往 [./src/modules/index.ts#L71](./src/modules/index.ts#L71) 修改 `raycast` 模块替换的 `url` 为你自己的后端服务地址。

> [!WARNING]
> 请不要让 Surge 既代理 Raycast 的请求，又代理你的后端服务的请求，这会导致无法正常使用。
>
> 除非...除非你给 headers 加点[料](./src/modules/index.ts#L70)，让你的后端服务可以正常工作. (同时关闭 SSL 检查 `NODE_TLS_REJECT_UNAUTHORIZED=0`)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits

- [Surge](https://nssurge.com/)
- [QiuChenlyOpenSource/InjectLib](https://github.com/QiuChenlyOpenSource/InjectLib)
- [sooxt98/spotify-crack-chrome-app](https://github.com/sooxt98/spotify-crack-chrome-app)
- [yufeikang/raycast_api_proxy](https://github.com/yufeikang/raycast_api_proxy)