# Activation Script

Activation Script 是一个旨在生成配置文件和激活软件许可证的脚本。这些配置文件和脚本用于拦截和操作各种应用程序提出的网络请求，允许您通过不同服务自动激活软件许可证。基于 [Surge](https://nssurge.com/)

<pre align="center">
🧪 Working in Progress
</pre>

## Table of Contents

- [Supported Activation Services](#supported-activation-services)
- [Supported Activation Applications](#supported-activation-applications)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)
- [Credits](#credits)


## Supported Activation Services

目前支持以下激活服务：

- [x] LemonSqueezy
- [x] Paddle

## Supported Activation Applications

目前支持以下应用程序：

- [x] Screen Studio (LemonSqueezy) `🪄 Stable`
- [x] AlDente Pro (Paddle) `🪄 Stable`
- [x] Spotify (仅移除音频广告，你可以使用 AdBlock 等工具屏蔽 HTML 广告) `🧪 Beta`
- [x] Raycast Pro Plan **(With Pro plan features)** `🧪 Beta` - [特殊说明 - Raycast Pro Plan](#raycast-pro-plan)
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

### Raycast Pro Plan

> Thanks to @zhuozhiyongde.

为了可以正常使用 Raycast Pro Plan，你需要在 `Surge -> HTTP -> 捕获 -> 捕获 MITM 覆写` 中修改 MITM 主机名，将最后一行 `*` 取消勾选。

### Raycast AI

Raycast AI 功能是 Pro Plan 的一部分，但必然的，Raycast 有自己的后端验证机制，因此此处的实现将会是一个不完美的解决方案。

我们转接了 Raycast 的 API 请求，但是由于 Surge 自身的限制，我们无法实现 SSE（Server-Sent Events）的转接，这将导致最终无法实现流式输出。

目前提供了 3 种转接方式：

- Official Endpoint
- Custom OpenAI Endpoint (Azure)
- Gemini Pro

> [!WARNING]
> 由于 Surge 限制，我们无法实现 SSE 的转接，因此无法实现流式输出。



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits

- [Surge](https://nssurge.com/)
- [QiuChenlyOpenSource/InjectLib](https://github.com/QiuChenlyOpenSource/InjectLib)
- [sooxt98/spotify-crack-chrome-app](https://github.com/sooxt98/spotify-crack-chrome-app)
- [yufeikang/raycast_api_proxy](https://github.com/yufeikang/raycast_api_proxy/tree/main)