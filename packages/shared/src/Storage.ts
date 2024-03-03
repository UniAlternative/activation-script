import { getDeepKeyInAnObject } from './utils/object'
import { getStorage, setStorage } from './utils/storage'

/**
 * Activation Script Module Storage Class: ASModuleStorage
 *
 * @description
 *
 * It is a class for storing module data, it can store any type of data, but it is type safe,
 * it can store and retrieve data according to your type.
 *
 * However, it should be noted that if the key is not passed in
 * during initialization or the key passed in is global,
 * it will access the global configuration data (not module data).
 *
 * @example
 * ```ts
 * const storage = new ASModuleStorage<{ a: number }>({ key: 'global' })
 * // or
 * const storage = new ASModuleStorage<{ a: number }>('global')
 *
 * storage.setValue('a', 1) // Fully Type Supported
 * storage.getValue('a') // 1
 * ```
 */
export class ASModuleStorage<T> {
  key: string

  constructor(props: {
    key?: string
  } | string) {
    if (typeof props === 'string' && props)
      this.key = props
    else if (props && (props as Record<string, any>).key)
      this.key = (props as Record<string, any>).key
    else
      throw new Error(`Invalid key: ${props}`)
  }

  private getStorageKey() {
    return this.key === 'global' ? this.key : `modules`
  }

  /**
   * Get value from storage
   *
   * @example
   * You can pass a dot-separated key to get a deep value, for example:
   *
   * ```ts
   * const storage = new ASModuleStorage({ key: 'global' })
   * storage.getValue('a.b.c') // Get global.a.b.c
   * ```
   * @param key
   */
  getValue(key?: keyof T) {
    const modules = getStorage(this.getStorageKey())
    return modules && key ? getDeepKeyInAnObject(modules[this.key], String(key)) : undefined
  }

  /**
   * Set value to storage
   *
   * @example
   * You can pass a dot-separated key to set a deep value, for example:
   *
   * ```ts
   * const storage = new ASModuleStorage({ key: 'global' })
   * storage.setValue('a.b.c', 1) // Set global.a.b.c = 1
   * ```
   * @param key
   * @param value
   */
  setValue(key: keyof T, value: T[keyof T]) {
    const modules = getStorage(this.getStorageKey())
    if (modules) {
      modules[this.key] = modules[this.key] || {}
      modules[this.key] = { ...modules[this.key], [key]: value }
      return setStorage(this.getStorageKey(), modules)
    }
    return false
  }

  /**
   * Clear all data in storage
   *
   * @description
   * It will clear all module data, use with caution. (But it will not clear global data)
   */
  clear() {
    const modules = getStorage(`modules`)
    if (modules) {
      delete modules[this.key]
      return setStorage(`modules`, modules)
    }
    return false
  }
}
