# Activation Script

Activation Script 是一个旨在生成配置文件和激活软件许可证的脚本。这些配置文件和脚本用于拦截和操作各种应用程序提出的网络请求，允许您通过不同服务自动激活软件许可证。基于 [Surge](https://nssurge.com/)

<pre align="center">
🧪 Working in Progress
</pre>

## Supported Activation Services

目前支持以下激活服务：

-   [x] LemonSqueezy
    -   [x] [Screen Studio](#screen-studio)
-   [x] Paddle
    -   [x] AlDente Pro
-   [x] Gumroad
    -   [x] [MediaMate](#mediamate)
-   [x] Spotify (仅移除音频广告，你可以使用 AdBlock 等工具屏蔽 HTML 广告) `🧪 Beta`
-   [ ] ~~Raycast Pro Plan **(Without Pro plan features)**~~ - [特殊说明 - Raycast Pro Plan](#raycast-pro-plan)

## 安装

前往 Surge 的 `Module` 配置页面，添加外部模块链接：`https://github.com/wibus-wee/activation-script/raw/gh-pages/activator.sgmodule`

或者你希望自行修改配置文件与脚本，你可以使用如下指令：

```bash
# 安装依赖
pnpm i

# 在当前目录下构建 activator.js 脚本
pnpm build:main

# 交互式命令
# 生成 Surge config 应添加的字段
pnpm generate gen

# 生成并移动 activator.js 到 Surge 配置目录
pnpm generate inject
```

## 特殊说明

### Screen Studio

```
401934ec-0a54-433c-a299-2a363501d4be
d06ad32e-00c2-43fb-a5a7-9bb44b094831
0c903cdd-9ee1-4935-8ad3-88de0ecef496
295aab81-b87e-437c-868a-1f0877216cae
4dc5cab3-03e0-41ab-827d-90dbe9e076f6
7a777528-c9b8-4db5-a986-0bd8d4312afd
d3ce015b-2093-42f5-a049-670edae6e7b4
f6e63b4e-91d4-4eb4-8dd0-dcb20933495e
f899ec8c-020b-4f8a-a09d-22a978b716a5
62c3bf31-428b-4bea-a31f-9a14f0a1a63c
```

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

如果想使用此功能，请以下项目搭建自己的后端服务进行体验： **（它们都是不一样的！）**

-   [wibus-wee/raycast-unblock](https://github.com/wibus-wee/raycast-unblock)
-   [zhuozhiyongde/Unlocking-Raycast-With-Surge](https://github.com/zhuozhiyongde/Unlocking-Raycast-With-Surge)
-   [yufeikang/raycast_api_proxy](https://github.com/yufeikang/raycast_api_proxy)

另外，你可能还需要前往 [./src/modules/index.ts#L83](./src/modules/index.ts#L83) 修改 `raycast` 模块替换的 `url` 为你自己的后端服务地址。

> [!WARNING]
> 不要让 Surge 既代理 Raycast 的请求，又代理你的后端服务的请求，这会导致无法正常使用。
>
> 除非...除非你给 headers 加点[料](./src/modules/index.ts#L70)，让你的后端服务可以正常工作. (同时建议后端服务关闭 SSL 检查 `NODE_TLS_REJECT_UNAUTHORIZED=0`)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits

-   [Surge](https://nssurge.com/)
-   [QiuChenlyOpenSource/InjectLib](https://github.com/QiuChenlyOpenSource/InjectLib)
-   [sooxt98/spotify-crack-chrome-app](https://github.com/sooxt98/spotify-crack-chrome-app)
-   [yufeikang/raycast_api_proxy](https://github.com/yufeikang/raycast_api_proxy)
-   [sfc9982/typoraActivator](https://github.com/sfc9982/typoraActivator)
