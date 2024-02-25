/**
 * Injects the given props into code.(Before the code is transpiled)
 * @param {object} props - The props to inject.
 * @example
 * inject({
 *  COMMIT_HASH: '123456',
 * })
 */
export function inject(props) {
  return {
    name: 'injectCodeProps',
    transform(code) {
      const propsEntries = Object.entries(props)
      if (propsEntries.length === 0)
        return code
      const propsCode = propsEntries.map(([key, value]) => `const ${key} = ${JSON.stringify(value)}`).join('\n')
      return `${propsCode}\n${code}`
    },
  }
}
