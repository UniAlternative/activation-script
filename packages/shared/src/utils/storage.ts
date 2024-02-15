import { destr } from "./destr"

const STORAGE_KEY = "activation-script"

export function getStorage(key?: string) {
  const storage = $persistentStore.read(STORAGE_KEY)
  if (storage) {
    const obj = destr(storage)
    return key ? obj[key] : obj
  }
  else {
    return key ? undefined : {}
  }
}

export function setStorage(key: string, value: any) {
  const storage = getStorage()
  storage[key] = value
  return $persistentStore.write(JSON.stringify(storage), STORAGE_KEY)
}

export function clearStorage() {
  return $persistentStore.write("", STORAGE_KEY)
}