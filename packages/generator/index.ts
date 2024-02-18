import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'
import prompts from 'prompts'
import { activator } from '@as/modules'
import { Command } from 'commander'
import { inject } from './functions/inject'

const hostnames = Array<string>()
const scripts = Array<{ name: string, pattern: string, type: string }>()
const externalUrl = `https://fastly.jsdelivr.net/gh/wibus-wee/activation-script@gh-pages`

function MITM(hostnames: any[], external = false) {
  return `
[MITM]
hostname = ${external ? `%APPEND% ` : ''}${hostnames.join(', ')}, as.as, *.as.as
`
}
function Script(_scripts: typeof scripts, external = false) {
  const scriptPath = external ? `${externalUrl}/activator.js` : `activator.js`
  const scriptUpdateInternal = 86400
  return `
[Script]
activation-script-dashboard = type=http-request,pattern=^https://as\.as/,requires-body=1,max-size=0,script-path=${scriptPath}${external ? `,script-update-internal=${scriptUpdateInternal}` : ''}
${_scripts
  .map((script) => {
    return `${script.name} = type=${script.type},pattern=^${script.pattern},requires-body=1,max-size=0,debug=1,script-path=${scriptPath}${external ? `,script-update-internal=${scriptUpdateInternal}` : ''}\n`
  })
  .join('')}
`
}

function addConfig(module: string, base: string) {
  console.log(`[I] Generating config for ${module}... Base: ${base}`)

  const url = new URL(base)
  const hostname = url.hostname
  const regex = /(?:https?:\/\/)?(?:www\.)?([^\/]+)\/?.*/
  const mainDomain = hostname.match(regex)?.[1] || hostname
  // 检查一下 hostnames 里面有没有这个域名，没有的话就加进去
  if (!hostnames.includes(`${mainDomain}`))
    hostnames.push(`${mainDomain}`)

  // 设一个 afterfix，用于处理 base 为数组的情况，防止 name 重复
  const afterfix = Array.isArray(activator[module].base) ? `-${hostname}` : ''
  for (const key in activator[module]) {
    // 开始遍历 module 内的 key
    if (key === 'base')
      continue // 接口 base route 绕过，不需要处理
    if (key === 'customs') {
      // 面对 Custom 的重写逻辑
      for (const custom of (activator[module] as any)[key]) {
        // if (custom.base === "*") {
        //   custom.base = "all"; // 为了防止 * 出错，改成 all
        // }
        // 遍历 customs
        scripts.push({
          name: `${module}-${custom.base}${afterfix}`,
          pattern: `${base}/${custom.base}`, // 这个地方应该用传入的 base，而不是 activator[module].base
          // 因为 activator[module].base 可能是数组，而这里只需要一个 base
          type: custom.type || 'http-request',
        })
      }
      continue
    }
    if (typeof (activator[module] as any)[key] === 'object') {
      scripts.push({
        name: `${module}-${key}${afterfix}`,
        pattern: `${base}/${(activator[module] as any)[key].base}`,
        type: (activator[module] as any)[key].type || 'http-request',
      })
    }
    else {
      scripts.push({
        name: `${module}-${key}${afterfix}`,
        pattern: `${base}/${key}`,
        type: 'http-request',
      })
    }
  }
}

function generateScriptConfig(echo = false) {
  for (const module in activator) {
    if (!Array.isArray(activator[module].base))
      activator[module].base = [activator[module].base as string]

    for (const base of activator[module].base)
      addConfig(module, base)
  }
  if (echo) {
    console.log('================ MITM ================')
    console.log(MITM(hostnames))
    console.log('================ Script ================')
    console.log(Script(scripts))
  }
}

async function patch() {
  generateScriptConfig()
  let configPath = process.cwd()
  // 询问配置文件所在位置。1. 当前目录 2. /Users/<username>/Library/Application Support/Surge/Profiles 3. 自定义
  await prompts([
    {
      type: 'select',
      name: 'config',
      message: 'Where is your config file?',
      choices: [
        { title: 'Current directory', value: 'current' },
        {
          title: 'Surge config directory',
          value: 'surge',
        },
        { title: 'Custom', value: 'custom' },
      ],
    },
  ])
    .then(async (res: { config: string }) => {
      if (res.config === 'current') {
        configPath = process.cwd()
      }
      else if (res.config === 'surge') {
        configPath = path.join(
          process.env.HOME as string,
          'Library/Application Support/Surge/Profiles',
        )
      }
      else {
        await prompts([
          {
            type: 'text',
            name: 'config',
            message: 'Please input your config file path',
          },
        ])
          .then((res: { config: string }) => {
            configPath = res.config
          })
          .catch((err: any) => {
            console.log(err)
          })
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
  const configFiles = Array<string>()
  fs.readdirSync(configPath).forEach((file) => {
    if (file.endsWith('.conf'))
      configFiles.push(file)
  })
  if (configFiles.length === 0) {
    console.log('No config file found.')
    return
  }

  prompts([
    {
      type: 'select',
      name: 'config',
      message: 'Which config file do you want to use?',
      choices: configFiles.map((file) => {
        return { title: file, value: file }
      }),
    },
  ])
    .then((res: { config: string }) => {
      let newConfig = ''
      const config = fs.readFileSync(
        path.join(configPath, res.config),
        'utf-8',
      )
      const regexMITM = /\[MITM\]/g
      // const regexScript = /\[Script\]/g

      if (!regexMITM.test(config)) {
        console.error(
          '❌ MITM not found. You should config MITM in Surge first.',
        )
        return
      }
      const regexMITMHostnames = /hostname = (.*)/g
      const oldHostnames = regexMITMHostnames.exec(config) as RegExpExecArray | null
      console.log('[*] OldHostnames', oldHostnames?.[1])
      // 去重，合并
      const newHostnames = Array.from(
        // new Set([...oldHostnames[1].split(", "), ...hostnames])
        new Set([...(oldHostnames?.[1] || '').split(', '), ...hostnames, 'as.as', '*.as.as']),
      )
      console.log('[*] NewHostnames', newHostnames)

      newConfig = config.replace(
        regexMITMHostnames,
        `hostname = ${newHostnames.join(', ')}`,
      ) // 替换掉原本的 hostname

      fs.writeFileSync(path.join(configPath, res.config), newConfig)
      // let oldScriptContent = "";
      const regexScriptBeforeLastQuoteContent = /\[Script\]([\s\S]*?)\[/g
      const regexScriptContent = /\[Script\]([\s\S]*)/g
      let isScriptHasContentBeforeLastQuote = false
      if (regexScriptBeforeLastQuoteContent.test(config))
        isScriptHasContentBeforeLastQuote = true

      // const oldScriptBeforeLastQuoteContent =
      //   regexScriptBeforeLastQuoteContent.exec(
      //     newConfig
      //   ) as RegExpExecArray | null;
      // if (oldScriptBeforeLastQuoteContent) {
      //   oldScriptContent = oldScriptBeforeLastQuoteContent[1];
      // } else {
      //   const oldScriptContentNoLastQuote = regexScriptContent.exec(
      //     newConfig
      //   ) as RegExpExecArray | null;
      //   if (oldScriptContentNoLastQuote) {
      //     oldScriptContent = oldScriptContentNoLastQuote[1];
      //   } else {
      //     console.error(
      //       "❌ Script not found. You should config Script in Surge first."
      //     );
      //     return;
      //   }
      // }
      // console.log("[*] OldScriptContent", oldScriptContent);

      const newScriptContent = Script(scripts)
      // newScriptContent 去掉 [Script]
      // newScriptContent = newScriptContent.replace("[Script]\n", "");
      console.log('[*] NewScriptContent', newScriptContent)

      // newConfig = newConfig.replace(
      //   regexScriptContent,
      //   `[Script]${mergedScriptContent}`
      // );

      newConfig = newConfig.replace(
        isScriptHasContentBeforeLastQuote
          ? regexScriptBeforeLastQuoteContent
          : regexScriptContent,
        `${newScriptContent}`,
      )

      fs.writeFileSync(path.join(configPath, res.config), newConfig)
      console.log('Config file fixed.')
    })
    .catch((err: any) => {
      console.log(err)
    })
}

async function action(str: any, _options: any) {
  generateScriptConfig(Object.keys(str).length === 0)
  if (str.out) {
    console.log('Generating config file...')
    fs.writeFileSync(
      path.join(str.out, 'activator.conf'),
      MITM(hostnames) + Script(scripts),
    )
    console.log('Config file generated.')
  }
  if (str.fix)
    await patch()

  if (str.module) {
    console.log('Generating .sgmodule file...')
    let content = fs.readFileSync(path.join(process.cwd(), './template.sgmodule'), 'utf-8')
    content += `\n\n${MITM(hostnames, str.external)}\n\n${Script(scripts, str.external)}`
    fs.writeFileSync(path.join(process.cwd(), 'activator.sgmodule'), `${content}`)
    console.log('.sgmodule file generated.')
  }
}

const program = new Command()

program.name('Activator').version('0.0.1')

program
  .command('gen')
  .description('generate config')
  .option('-o, --out <path>', 'output path')
  .option('-f, --fix', 'fix config file')
  .option('-m, --module', 'generate .sgmodule')
  .option('-e, --external', 'use external source url')
  .action(action)
program.command('inject').description('inject activator').action(inject)
program.command('patch').description('patch config').action(patch)

// program.command("ai").description("ai manager").action(aiManager);
program.parse()
