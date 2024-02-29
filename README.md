# Activation Script

Activation Script 是一个旨在生成配置文件和激活软件许可证的脚本。这些配置文件和脚本用于拦截和操作各种应用程序提出的网络请求，允许您通过不同服务自动激活软件许可证。基于 [Surge](https://nssurge.com/)

<pre align="center">
🧪 Working in Progress
</pre>

## Features

目前支持激活的应用程序：

-   [x] LemonSqueezy
    -   [x] Screen Studio - [特殊说明](#screen-studio)
-   [x] Paddle - [特殊说明](#paddle)
    -   [x] AlDente Pro
    -   [x] iStatistica Pro
    -   [x] One Switch
    -   [x] com.charliemonroe
        -   [x] Downie 4
        -   [x] Permute 3
    -   [x] Sensei
    -   [x] Rectangle Pro
    -   [x] MenubarX
-   [x] Gumroad - [特殊说明](#gumroad)
    -   [x] MediaMate
    -   [x] ...more
-   [x] App Store Restore Purchase *（仅支持仍使用[旧式 verifyReceipt 验证（文档中已被弃用）](https://developer.apple.com/documentation/appstorereceipts/verifyreceipt)的应用）* - [特殊说明](#app-store-restore-purchase)
    -   [x] iShot Pro
    -   [ ] ...more
-   [x] Shottr
    -   [x] Basic Tier
    -   [ ] Friends Club
-   [ ] [~~Raycast Pro Plan~~]((#raycast-pro-plan))

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

### Paddle

Paddle 是一个软件许可证管理服务，它的 SDK 会在应用程序启动时验证许可证。你可以使用以下指令查找使用了本机使用了 `Paddle.framework` 的应用程序：

```shell
find /Applications -name "Paddle.framework" -type d -exec sh -c 'echo "应用程序 {} 使用了 Paddle.framework"' \;
```

一般来说，它们都可以被正常激活。同时，也欢迎提交你发现的使用了 Paddle 的应用程序，我会将它们添加到列表中。

或许你需要许可证来触发激活程序，你可以使用以下激活码（fake）：

> 尤其针对 `com.charliemonroe` 的程序做了许可证格式的处理，因此你可以使用以下激活码来激活它们。

```
9U2DM70E-ED0RPLF3-6FOCF9UB-3GQ3WPEU-KREMAIUX
D2TMD4AR-3CPQYT42-N6UWNYYA-69REG5QI-T4C7ZSIR
75ZQRI8T-CQ8H46WJ-NFJHNROZ-P0A3PZ2R-SUA6PPYV
JP26HIZ7-BP09SYO8-ER67YRNR-L61JBMJ7-CCZRM7IZ
4JKMBTVI-4QXMR0O7-3WDLW8Z0-80618ZML-0EKK26KW
61WUMZRG-DK4AI5JD-HIYYM3CP-FCFSNKLS-P08UYALJ
F2X9ZBAR-ZO9Y1L4G-19MCAUK1-46358751-340O82BP
8DG6WQ0G-HTEEITAS-89ZYJXMC-MEHW736F-DZFHNXPH
I4QP2745-TBLLELKW-DQ6HRLOG-VPT8CN2V-Z5HDUTPY
```

###### [Alogrithm](./packages/modules/paddle/alogrithm/gen.ts)

### App Store Restore Purchase

> [!WARNING]
> 由于 Apple 的限制，这个功能只能用于仍使用旧式 verifyReceipt 验证（文档中已被弃用）的应用。如果你的应用使用了新的验证方法，那么这个功能将无法正常工作。

欢迎提交你发现的使用了旧式验证的应用程序，我会将它们添加到列表中。

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

###### [Alogrithm](./packages/modules/lemon-squeezy/alogrithm/screen-studio.ts)

### Gumroad

> Thanks to @QiuchenlyOpenSource & @Qiuchenly.

理论上，以下的激活码可以用于所有使用 Gumroad 的应用程序。

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

###### [Alogrithm](./packages/modules/gumroad/alogrithm/index.ts)

### Raycast Pro Plan

> Thanks to @zhuozhiyongde.

为了可以正常使用 Raycast Pro Plan，你需要在 `Surge -> HTTP -> 捕获 -> 捕获 MITM 覆写` 中修改 MITM 主机名，将最后一行 `*` 取消勾选。

> [!WARNING]
> 由于 Surge 限制，在 Surge 内的 runtime 做脚本无法实现 SSE，这对体验有很大很大的影响，以及还有一些实现上的问题，因此我打算不做内置的 AI 支持了

如果想使用此功能，请以下项目搭建自己的后端服务进行体验： **（它们都是不一样的！）**

-   [wibus-wee/raycast-unblock](https://github.com/wibus-wee/raycast-unblock)
-   [zhuozhiyongde/Unlocking-Raycast-With-Surge](https://github.com/zhuozhiyongde/Unlocking-Raycast-With-Surge)
-   [yufeikang/raycast_api_proxy](https://github.com/yufeikang/raycast_api_proxy)

另外，你可能还需要前往 [./packages/modules/index.ts](./packages/modules/index.ts) 修改 `raycast` 模块替换的 `url` 为你自己的后端服务地址。

```diff
$done({
    url: $request.url.replace(
        'https://backend.raycast.com',
-        'http://127.0.0.1:3000',
+        'https://your-backend-service.com',
    ),
    headers: $request.headers,
    body: $request.body,
})
```

> [!WARNING]
> 不要让 Surge 既代理 Raycast 的请求，又代理你的后端服务的请求，这会导致无法正常使用。
>
> 除非...除非你给 headers 加点[料](./src/modules/index.ts#L70)，让你的后端服务可以正常工作. (同时建议后端服务关闭 SSL 检查 `NODE_TLS_REJECT_UNAUTHORIZED=0`)

## Credits

-   [Surge](https://nssurge.com/)
-   [QiuChenlyOpenSource/InjectLib](https://github.com/QiuChenlyOpenSource/InjectLib)
-   [sooxt98/spotify-crack-chrome-app](https://github.com/sooxt98/spotify-crack-chrome-app)
-   [yufeikang/raycast_api_proxy](https://github.com/yufeikang/raycast_api_proxy)
-   [sfc9982/typoraActivator](https://github.com/sfc9982/typoraActivator)

## License

This project is licensed under the AGPLv3 License. See the [LICENSE](LICENSE) file for details.

## Author

Activation Script © Wibus, Released under AGPLv3. Created on Sep 9, 2023

> [Personal Website](http://wibus.ren/) · [Blog](https://blog.wibus.ren/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)
