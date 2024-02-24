import type { ActivatorObjFunc } from '@as/shared'
import { buildResponse, httpClient } from '@as/shared'
import { activator } from '@as/modules'

const url = $request.url.split('?')[0]

/**
 * 检查 url 是否匹配 base 配置
 */
export function isMatchBase(url: string, base: string | string[]) {
  if (Array.isArray(base)) {
    for (const item of base) {
      if (isMatchBase(url, item))
        return true
    }
    return false
  }
  url = url.replace(/\/$/, '')
  base = base.replace(/\/$/, '')
  if (url === base)
    return true
  else if (base.includes('*') && url.includes(base.replace('*', '').replace(/\/$/, '')))
    return true
  else
    return false
}

/**
 * Automatic execution of the corresponding function according to the URL
 * 自动执行对应的函数
 * @description This will match the URL according to the base of the module function, and if it matches, it will execute the func of the module function
 */
export function launch() {
  console.log(`[activator] ${url}`)

  /**
   * 匹配模块函数
   * @description 这会根据模块函数的 base 属性来匹配 url，如果匹配成功则执行模块函数的 func 属性
   *
   * @param moduleFunc 模块函数
   * @returns 匹配结果
   *
   */
  function matchModuleFunc(moduleFunc: ActivatorObjFunc) {
    console.log(`[activator] matchModuleFunc: ${moduleFunc.base} | ${isMatchBase(url, moduleFunc.base)}`)
    // 处理 * 通配符
    if (isMatchBase(url, moduleFunc.base))
      return moduleFunc.func()
    // 不然就是要完全匹配
    else if (url.replace(/\/$/, '') === moduleFunc.base.replace(/\/$/, '')) // 去掉末尾的 / 后再匹配
      return moduleFunc.func()
  }

  /**
   * 处理模块函数
   * @description 这会根据模块函数的类型来执行对应的处理
   *
   * @param moduleFunc 模块函数
   * @returns 匹配结果
   *
   */
  function handleModuleFunc(moduleFunc: ActivatorObjFunc) {
    if (typeof moduleFunc === 'object') {
      const match = matchModuleFunc(moduleFunc)
      if (match)
        return match
    }
  }

  for (const module in activator) {
    const moduleItem = activator[module]

    if (isMatchBase(url, moduleItem.base)) { // 检查 url 是否匹配 module 中配置的 base（利用 includes）
      for (const key in moduleItem) { // 遍历 module 中的配置（base, activate, validate, customs）
        const moduleItemOptions = moduleItem[key as keyof typeof moduleItem]

        if (key === 'base') // 自然是不需要的
          continue

        // 如果配置是数组（意味着有多个配置）这只会在 customs 中出现
        if (typeof moduleItemOptions === 'object' && Array.isArray(moduleItemOptions)) {
          for (const custom of moduleItemOptions as ActivatorObjFunc[]) {
            const match = handleModuleFunc({
              ...custom,
              base: `${moduleItem.base}/${custom.base.replace(/^\//, '')}`,
            })
            if (match)
              return match
          }
          continue
        }

        // 如果配置是对象（意味着只有一个配置）这只会在 activate 和 validate 中出现
        if (typeof moduleItemOptions === 'object') {
          const match = handleModuleFunc(moduleItemOptions)
          if (match)
            return match
          continue
        }

        // 如果 url 不包含 module.base/key 则跳过，不用管后面的了
        if (!url.includes(`${moduleItem.base}/${key}`))
          continue

        // 如果配置是函数，这个时候其实就没有什么特殊情况了，所以直接执行
        if (typeof moduleItemOptions === 'function')
          return moduleItemOptions()

        // 如果配置是字符串，几乎没有使用过，也算直接返回吧
        if (typeof moduleItemOptions === 'string')
          return buildResponse({ body: moduleItemOptions })
      }
    }
  }
  console.log(`[activator] ${url} is not matched`)
  returnDefaultResponse()
  // $done();
}

function returnDefaultResponse() {
  console.log(
    `[activator] returnDefaultResponse: [${$request.method}] -> ${url}`,
  )

  httpClient[$request.method.toLowerCase() as keyof typeof httpClient](
    {
      url: $request.url,
      headers: $request.headers,
    },
    (err: any, response: any, _data: any) => {
      if (err) {
        console.log(err)
        return buildResponse({ status: 500, body: err })
      }

      if (!_data)
        console.log('No data returned')

      const res = {
        status: response.status,
        headers: response.headers,
        body: _data,
      }
      return buildResponse(res)
    },
  )
}
