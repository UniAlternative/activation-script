function genPaddle() {
  // Example: (Downie 4 Fake License)
  // B7EE3D3C-B7EE3D3C-B7EE3D3C-B7EE3D3C-B7EE3D3C
  // A1BB4A4A-A1BB4A4A-A1BB4A4A-A1BB4A4A-A1BB4A4A
  const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const random = () => words[Math.floor(Math.random() * words.length)]
  const gen = () => Array(5).fill(0).map(random).join('')
  return `${gen()}-${gen()}-${gen()}-${gen()}-${gen()}`
}

console.log(genPaddle())
// Promise.all(Array(10).fill(0).map(() => genPaddle())).then(res => console.log(res.join('\n')))
