function genPaddle() {
  // Example: B7EE3D3C-B7EE3D3C-B7EE3D3C-B7EE3D3C-B7EE3D3C
  const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const len = words.length
  let result = ''
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 8; j++)
      result += words[Math.floor(Math.random() * len)]

    if (i !== 4)
      result += '-'
  }
  return result
}

console.log(genPaddle())
// Promise.all(Array(10).fill(0).map(() => genPaddle())).then(res => console.log(res.join('\n')))
