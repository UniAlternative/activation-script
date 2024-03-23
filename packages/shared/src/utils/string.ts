export function camelCaseToUnderline(str: string) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function underlineToCamelCase(str: string) {
  return str.replace(/_(\w)/g, (_, letter) => letter.toUpperCase())
}
