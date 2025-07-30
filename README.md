# Activation Script

[![Version][package-version-src]][package-version-href]
[![License][license-src]][license-href]

> [!CAUTION]
> 近期，我们发现越来越多软件开始使用了一些避免破解的手段，如 **`Certificate Pinning`**。
>
> 这使得我们无法再像以前那样使用 MITM 来激活软件。因此，我们在未来将有可能停止维护 Activation Script。

## Features

-   [x] Activate the application with MITM
-   [ ] ...What else? [Create a new issue](https://github.com/wibus-wee/activation-script/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml)

###### [Our Roadmap](https://github.com/wibus-wee/activation-script/issues/15)

## Modules

> 有部分软件使用了一些特殊的激活方式，因此我们需要针对不同的软件进行不同的处理，所以他们也会被分为不同的模块。

目前支持的激活模块有：

-   [x] LemonSqueezy <sup>***`📦 Stable`***</sup>
-   [x] Paddle <sup>***`📦 Stable`***</sup>
-   [x] Gumroad <sup>***`📦 Stable`***</sup>
-   [x] App Store Restore Purchase <sup>***`🪄 Beta`***</sup>
-   [x] Shottr <sup>***`🪄 Beta`***</sup>
    -   [x] Basic Tier
    -   [ ] Friends Club
-   [x] lo.cafe <sup>***`🪄 Beta`***</sup>
    -   [x] NotchNook
-   [x] Raycast Pro Plan <sup>***`🌊 Partially supported`***</sup>

###### [各个模块特殊说明](#特殊说明)

## 安装

前往 Surge 的 `Module` 配置页面，添加外部模块链接，以下有不同的链接可供选择：

- [GitHub Action](https://github.com/wibus-wee/activation-script/raw/gh-pages/activator.sgmodule) <sup>***`💥 Latest`***</sup> 使用最新代码构建，但是这可能会带来不稳定性和一些问题
- [GitHub Release](https://github.com/wibus-wee/activation-script/releases/latest/download/activator.sgmodule) <sup>***`📦 Stable`***</sup> 最新的稳定版本，如果不追求最新的功能，你可以使用这个版本

或者你希望自行修改配置文件与脚本，你可以使用如下指令：

```bash
pnpm i
pnpm build:core # Build core(activator.js)

# CLI (When you want to use local module)
pnpm start:generator gen # Generate config
pnpm start:generator inject # Build activator.js and move to directory
pnpm start:generator patch # Patch Surge config file (Beta)
```

###### [项目结构](#项目结构)

## 特殊说明

### Paddle

-   [x] AlDente Pro `$25`
-   [x] iStatistica Pro `$9.99`
-   [x] One Switch `$4.99`
-   [x] Charliemonroe
    -   [x] Downie 4 `$19.99`
    -   [x] Permute 3 `$14.99`
-   [x] Sensei `$29`
-   [x] Rectangle Pro `$10.15`
-   [x] MenubarX `$4.99`
-   [x] MarginNote 3 `$12.99`
-   [x] MWeb Pro `$34.99`
-   [x] iReal Pro (All Styles) `$20.39+$5.09+$6.11 = $31.59`
-   [x] Clop `$9.99/mo`
-   [x] Mission Control Plus `$9.99/mo`

Paddle 是一个软件许可证管理服务。你可以使用以下指令查找使用了本机使用了 `Paddle.framework` 的应用程序：

```shell
find /Applications -name "Paddle.framework" -type d -exec sh -c 'echo "应用程序 {} 使用了 Paddle.framework"' \;
```

一般来说，它们都可以被正常激活。同时，也欢迎提交你发现的使用了 Paddle 的应用程序，我会将它们添加到列表中。

或许你需要许可证来触发激活程序，你可以使用以下激活码（fake）：

> 尤其针对 `com.charliemonroe` 的程序做了许可证格式的处理，因此你可以使用以下激活码来激活它们。

```
D7BC2F5F-E9BC2E9E-B4DA2D3C-E7FF3E9F-D3FA6C7F
A7DF3E8C-C2FD6B6E-E2EA2F6E-E7AD1E2F-B6DD8F2A
D6AE1F1C-E8BE9B3C-E3EC1D5B-B5BB8D4D-C1DC3C3D
F3BF4F2E-D7FE1B5B-E8BF7B6B-D7DA8A7A-F5FC7A4B
F2FC1F4B-F8FF7F8D-D9EE6E7A-D4FA9F2E-D1FA2A9A
B2AE7F7A-D5EE5C5F-F6CC6C6D-D4FF4C1E-C5DF6C9F
B6AA1C9B-E3FC7B8D-F8AE5F4E-A2CC6F9A-F5BE5E6B
D9BA5F4E-B8CA4E4D-B9AC7A1C-D2DA2A1D-E7BF9C2F
D1BC8C4B-E8EE7E4C-E1BD9A6B-A5EF3C3B-D7ED5E4B
C2BF5D3B-F4AC9F5F-A8EB4B9E-B8AA5E8D-E2CC5C8D
```

###### [Alogrithm](./packages/modules/paddle/alogrithm/gen.ts)

### App Store Restore Purchase

> [!WARNING]
> 由于 Apple 的限制，这个功能只能用于仍使用[旧式 verifyReceipt 验证（文档中已被弃用）](https://developer.apple.com/documentation/appstorereceipts/verifyreceipt)的应用。如果你的应用使用了新的验证方法，那么这个功能将无法正常工作。

欢迎提交你发现的使用了旧式验证的应用程序，我会将它们添加到列表中。

-   [x] iShot Pro `$12.99`

### Screen Studio

> [!WARNING]
> 由于 Screen Studio 的限制，这个功能只能用于支持开启 Skip Network Certificate Validation 的版本。

- License Key: `64fd88be-79c0-4167-8078-680ddef8cbc5`

### LemonSqueezy

-   [x] Screen Studio `$89` - <sup>***`Only support <= 2.20 version` & `64fd88be-79c0-4167-8078-680ddef8cbc5`***</sup>
-   [x] Alist Desktop `$9.99` <sup>***`401934ec-0a54-433c-a299-2a363501d4be`***</sup>
-   [x] LookAway `$9.99`
-   [x] ~~Kerlig `$39`~~ - <sup>***`Need to open Dev mode`***</sup>

除了特别说明的激活码外，你可以使用以下激活码来激活 LemonSqueezy 的应用程序：

```
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

<!-- -   [x] MediaMate `$7.62` -->
-   [x] MacMouseFix `$2.99`
-   [x] ...more

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

### Lo.Cafe

Script currently supports the following applications from Lo.Cafe:

-   [ ] NotchNook `$40` <sup>***`🐛 Bug`***</sup>

### Raycast Pro Plan

> Thanks to @zhuozhiyongde.

#### 🎯 功能概述

Raycast Pro Plan 模块可以让你使用 Raycast 的 Pro 功能，包括：
- ✅ **基础 Pro 功能**：无限制使用 Raycast 的所有 Pro 特性（除云同步能力）
- ⚠️ ~~**翻译功能**：内置翻译服务（使用 DeepL）~~（年久失修，欢迎 PR）
- ⚠️ ~~**AI 功能**：需要额外配置后端服务才能使用~~

> [!TIP]
> Raycast 现在已经支持 BYOK（Bring Your Own Key）了，因此该脚本将会注释与 AI 相关的所有代码

#### 🚀 快速开始

**第一步：基础配置**
1. 按照[安装说明](#安装)添加模块到 Surge
2. 在 Surge 中进行以下设置：
   - 打开 `Surge -> HTTP -> 捕获 -> 捕获 MITM 覆写`
   - **取消勾选**最后一行的 `*` 选项
3. 重启 Raycast，现在你可以使用基础 Pro 功能了

> [!TIP]
> 如果你只需要基础 Pro 功能（不包括 AI），到这里就完成了！

**第二步：恢复其他功能（可选）**
如果你需要使用 Surge Dashboard 或其他流量捕获功能：
- 使用完 Raycast 后，重新勾选 `*` 选项

#### 🤖 AI 功能配置

> [!TIP]
> Raycast 现在已经支持 BYOK（Bring Your Own Key）了，因此该脚本将会注释与 AI 相关的所有代码
>
> 同时，因为 DMCA，这里的一些解决方案已经消失了，有能力的，欢迎自行研究

由于技术限制，AI 功能需要通过外部后端服务实现。我们提供了三种不同的解决方案：

**方案选择指南：**
- [raycast_api_proxy](https://github.com/yufeikang/raycast_api_proxy)
- [raycast-unblock](https://github.com/wibus-wee/raycast-unblock)
- [Unlocking-Raycast-With-Surge](https://github.com/zhuozhiyongde/Unlocking-Raycast-With-Surge)

**配置步骤：**

1. **选择并部署后端服务**
   - 选择上述方案之一，按照其文档部署服务
   - 记录你的后端服务地址（如：`https://your-backend.com`）

2. **配置方式 A：Header 重写（推荐）**
   ```
   在 Surge 中添加 Header 重写规则：
   backend.raycast.com -> your-backend-service.com
   ```
   这种方式无需修改代码，更加简便。

3. **配置方式 B：修改代码**
   如果你需要更精细的控制，可以修改源码：

   a. 修改 `packages/modules/raycast/universal.ts` 中的服务地址：
   ```typescript
   // 将 http://127.0.0.1:3000 改为你的后端地址
   'https://your-backend-service.com'
   ```

   b. 如果使用 raycast-unblock，还需要修改 `packages/modules/index.ts`：
   ```diff
   activate: {
       base: 'me',
   -   func: raycastActivate,
   +   func: unblockRequest,
   },
   ```

4. **重新构建脚本**
   ```bash
   pnpm build:core
   ```

#### ⚠️ 注意事项

- **网络配置**：确保 Surge 不要同时代理 Raycast 和你的后端服务，这会造成循环代理
- **SSL 证书**：如果遇到证书问题，可以在后端服务中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`
- **功能限制**：由于 Surge 的技术限制，无法完美实现 AI 的流式响应，体验可能不如原生

#### 🔧 故障排除

**问题：Raycast Pro 功能无法使用**
- 可能需要取消勾选了 MITM 中的 `*` 选项
- 确认模块已正确加载到 Surge

**问题：AI 功能不工作**
- 检查后端服务是否正常运行
- 确认网络配置没有造成循环代理
- 查看 Surge 日志确认请求是否正确转发

**问题：翻译功能异常**
- 翻译功能使用内置的 DeepL 服务，通常不需要额外配置
- 如需转发到后端，可以修改 translations 路由配置

> [!NOTE]
> 未来计划：当 [Dashboard 功能](https://github.com/wibus-wee/activation-script/issues/13) 完成后，这些配置将可以通过图形界面完成，无需手动修改代码。

## 项目结构

```text
.
├── .github
│   └── workflows
├── .vscode
├── packages
│   ├── core
│   ├── modules
│   ├── generator
│   └── shared
└── ...others
```

- `core`: 核心模块，负责启动与运行时的匹配和运行逻辑
- `modules`: 模块集合，负责修改请求与响应
- `generator`: 生成器，负责生成配置文件与脚本
- `shared`: 共享模块，提供一些共享的工具（例如：储存、解析、类型支持）

## Credits

-   [Surge](https://nssurge.com/)
-   [QiuChenlyOpenSource/InjectLib](https://github.com/QiuChenlyOpenSource/InjectLib)
-   ~~[sooxt98/spotify-crack-chrome-app](https://github.com/sooxt98/spotify-crack-chrome-app)~~
-   [yufeikang/raycast_api_proxy](https://github.com/yufeikang/raycast_api_proxy)
-   ~~[sfc9982/typoraActivator](https://github.com/sfc9982/typoraActivator)~~

## License

This project is licensed under the AGPLv3 License. See the [LICENSE](LICENSE) file for details.

## Author

Activation Script © Wibus, Released under AGPLv3. Created on Sep 9, 2023

> [Personal Website](http://wibus.ren/) · [Blog](https://blog.wibus.ren/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)

<!-- Badges -->

[package-version-src]: https://img.shields.io/github/package-json/v/wibus-wee/activation-script?style=flat&colorA=080f12&colorB=1fa669
[package-version-href]: https://github.com/wibus-wee/activation-script
[license-src]: https://img.shields.io/github/license/wibus-wee/activation-script.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/wibus-wee/activation-script/blob/main/LICENSE
