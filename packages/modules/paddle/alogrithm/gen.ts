function _genPaddle() {
  const words = 'ABCDEF'
  const numbers = '123456789'
  const gen = (str: string, len: number) => Array(len).fill(0).map(() => str.charAt(Math.floor(Math.random() * str.length))).join('')
  return `${gen(words, 1)}${gen(numbers, 1)}${gen(words, 1)}${gen(words, 1)}${gen(numbers, 1)}${gen(words, 1)}${gen(numbers, 1)}${gen(words, 1)}`
}

function genPaddle() {
  return `${_genPaddle()}-${_genPaddle()}-${_genPaddle()}-${_genPaddle()}-${_genPaddle()}`
}
Promise.all(Array(10).fill(0).map(() => genPaddle())).then(res => console.log(res.join('\n')))
