import type { ActivatorObjFunc } from '@as/shared'
import { Done, ResponseDone } from '@as/shared'
import { activator } from '@as/modules'

const url = $request.url.split('?')[0]

/**
 * 检查 url 是否匹配 base 配置
 */
export function isMatchBase(url: string, base: string | string[], strict = true) {
  if (Array.isArray(base)) {
    for (const item of base) {
      if (isMatchBase(url, item, strict))
        return true
    }
    return false
  }
  url = url.replace(/\/$/, '')
  if (base.includes('*'))
    strict = false // 如果 base 中包含 * 则不需要严格匹配
  base = base.replace('*', '').replace(/\/$/, '')
  if (strict && url === base)
    return true
  else if (!strict && url.includes(base))
    return true
  else
    return false
}

/**
 * Automatic execution of the corresponding function according to the URL
 * 自动执行对应的函数
 * @description This will match the URL according to the base of the module function, and if it matches, it will execute the func of the module function
 */
export async function launch() {
  console.log(`[activator] ${url}`)

  /**
   * 匹配模块函数
   * @description 这会根据模块函数的 base 属性来匹配 url，如果匹配成功则执行模块函数的 func 属性
   *
   * @param moduleFunc 模块函数
   * @returns 匹配结果
   *
   */
  async function matchModuleFunc(moduleFunc: Omit<ActivatorObjFunc, 'base'> & { base: string | string[] }) {
    if (Array.isArray(moduleFunc.base)) {
      for (let base of moduleFunc.base) {
        base = base.replace(/\/$/, '')
        const res = await matchModuleFunc({ ...moduleFunc, base }) as any
        if (!res)
          continue
        return res
      }
      return false
    }
    // 处理 * 通配符
    if (isMatchBase(url, moduleFunc.base))
      return await moduleFunc.func()
    // 不然就是要完全匹配（去掉末尾的 / 后再匹配）
    else if (url.replace(/\/$/, '') === moduleFunc.base.replace(/\/$/, ''))
      return await moduleFunc.func()
    return false
  }

  /**
   * 处理模块函数
   * @description 这会根据模块函数的类型来执行对应的处理
   *
   * @param moduleFunc 模块函数
   * @returns 匹配结果
   *
   */
  async function handleModuleFunc(moduleFunc: Omit<ActivatorObjFunc, 'base'> & { base: string | string[] }) {
    if (typeof moduleFunc === 'object') {
      const match = await matchModuleFunc(moduleFunc)
      if (match)
        return match
    }
  }

  for (const module in activator) {
    const moduleItem = activator[module]

    if (isMatchBase(url, moduleItem.base, false)) { // 检查 url 是否匹配 module 中配置的 base（利用 includes）
      console.log(`[activator] ${url} is matched`)
      for (const key in moduleItem) { // 遍历 module 中的配置（base, activate, validate, customs）
        const moduleItemOptions = moduleItem[key as keyof typeof moduleItem]

        if (key === 'base') // 自然是不需要的
          continue

        // 如果配置是数组（意味着有多个配置）这只会在 customs 中出现
        if (typeof moduleItemOptions === 'object' && Array.isArray(moduleItemOptions)) {
          for (const custom of moduleItemOptions as ActivatorObjFunc[]) {
            const base = typeof moduleItem.base === 'string' ? `${moduleItem.base}/${custom.base.replace(/^\//, '')}` : moduleItem.base.map(item => `${item}/${custom.base.replace(/^\//, '')}`)
            const match = await handleModuleFunc({
              ...custom,
              // base: `${moduleItem.base}/${custom.base.replace(/^\//, '')}`,
              base,
            })
            if (match) {
              console.log(`[activator] Handle customs: ${custom.base}`)
              return match
            }
            else {
              console.log(`[activator] ${url} is not matched in customs`)
            }
          }
          continue
        }

        // 如果配置是对象（意味着只有一个配置）这只会在 activate 和 validate 中出现
        if (typeof moduleItemOptions === 'object' && !Array.isArray(moduleItemOptions)) {
          const match = await handleModuleFunc({
            ...moduleItemOptions,
            base: `${moduleItem.base}/${moduleItemOptions.base.replace(/^\//, '')}`,
          })
          if (match) {
            console.log(`[activator] Handle ${key}: ${moduleItemOptions.base}`)
            return match
          }
          continue
        }

        const base = typeof moduleItem.base === 'string' ? moduleItem.base : moduleItem.base.find(item => isMatchBase(url, item, false))
        console.log(`[activator] ${url} | ${base} | ${key}`)
        if (!isMatchBase(url, `${base}/${key}`))
          continue

        // 如果配置是函数，这个时候其实就没有什么特殊情况了，所以直接执行
        if (typeof moduleItemOptions === 'function') {
          console.log(`[activator] Handle ${key}`)
          return await moduleItemOptions()
        }

        // 如果配置是字符串，几乎没有使用过，也算直接返回吧
        if (typeof moduleItemOptions === 'string')
          return ResponseDone({ body: moduleItemOptions })
      }
    }
  }
  console.log(`[activator] ${url} is not matched`)
  return Done({})
}
