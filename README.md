# Activation Script

Activation Script 是一个旨在生成配置文件和激活软件许可证的脚本。这些配置文件和脚本用于拦截和操作各种应用程序提出的网络请求，允许您通过不同服务自动激活软件许可证。基于 [Surge](https://nssurge.com/)

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

- [x] ~~Craft~~ (invalid now.)
- [x] Elpass **(你需要与 [QiuChenlyOpenSource/InjectLib](https://github.com/QiuChenlyOpenSource/InjectLib) 搭配使用)**
- [x] Spotify (仅移除音频广告，你可以使用 AdBlock 等工具屏蔽 HTML 广告)
- [x] Raycast (WIP.) `注：即使你使用了激活脚本，Raycast 的 Pro 功能还是无法使用的，如 AI 功能，需要后续转接接口，不使用 Raycast 的 API。`


## 安装

Activation Script 不提供已编译的脚本和配置文件，您需要自行构建。

### 构建 Activator

1. 打开终端并导航到项目目录。

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

## Configuration

### MITM Section

The MITM (Man-In-The-Middle) section specifies the hostnames for which you want to intercept network traffic. The script generates wildcard entries for the main domain of each supported activation service.

Example MITM Section:

```shell
# PLEASE! DO NOT USE THIS CODE. IT IS JUST AN EXAMPLE.
[MITM]
# You should only modify the hostname.
hostname = *.xxxx.com, *.yyyy.com
```

### Script Section

The Script section contains rules for intercepting and executing activation functions based on URL patterns. Each activation service has associated activation and validation functions that are executed when specific URLs are matched.

Example Script Section:

```shell
# PLEASE! DO NOT USE THIS CODE. IT IS JUST AN EXAMPLE.
[Script]
xxxx-base = type=http-request,pattern=^https://api.xxxx.com/v1/licenses,requires-body=1,max-size=0,debug=1,script-path=activator.js
yyyy-base = type=http-request,pattern=^https://v3.yyyy.com/3.2/license,requires-body=1,max-size=0,debug=1,script-path=activator.js
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits

- [Surge](https://nssurge.com/)
- [QiuChenlyOpenSource/InjectLib](https://github.com/QiuChenlyOpenSource/InjectLib)
- [sooxt98/spotify-crack-chrome-app](https://github.com/sooxt98/spotify-crack-chrome-app)