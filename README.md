# Activation Script

The Activation Script is a script designed to generate configuration files and activate software licenses for the [Surge](https://nssurge.com/) proxy tool. These configuration files are used to intercept and manipulate network requests made by various applications, allowing you to automate the activation of software licenses through different services.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Supported Activation Services](#supported-activation-services)
- [License](#license)

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Clone or download this repository to your local machine.
3. Navigate to the project directory in your terminal.

## Usage

To use the Activation Script, follow these steps:

1. Open a terminal and navigate to the project directory.
2. Run the script with the following command:

   ```shell
   node activator.js generate
   ```

   This command generates two important configuration sections: MITM (Man-In-The-Middle) and Script. These sections are used by Surge to intercept and manipulate network requests.

3. Copy the generated MITM and Script sections to your Surge configuration file.

4. Configure Surge to use the generated configuration file.

5. Start Surge with the updated configuration.

Now, Surge will intercept specific network requests and execute activation functions when triggered.

## Configuration

### MITM Section

The MITM (Man-In-The-Middle) section specifies the hostnames for which you want to intercept network traffic. The script generates wildcard entries for the main domain of each supported activation service.

Example MITM Section:

```shell
# PLEASE! DO NOT USE THIS CODE. IT IS JUST AN EXAMPLE.
[MITM]
hostname = *.lemonsqueezy.com, *.paddleapi.com
```

### Script Section

The Script section contains rules for intercepting and executing activation functions based on URL patterns. Each activation service has associated activation and validation functions that are executed when specific URLs are matched.

Example Script Section:

```shell
# PLEASE! DO NOT USE THIS CODE. IT IS JUST AN EXAMPLE.
[Script]
lemonSqueezy-base = type=http-request,pattern=^https://api.lemonsqueezy.com/v1/licenses,requires-body=1,max-size=0,debug=1,script-path=activator.js
paddle-base = type=http-request,pattern=^https://v3.paddleapi.com/3.2/license,requires-body=1,max-size=0,debug=1,script-path=activator.js
```

## Supported Activation Services

The Activation Script currently supports the following activation services:

- LemonSqueezy
- Paddle

## Supported Activation Applications

The Activation Script currently supports the following applications:

- ~~Craft~~ (invalid now.)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.