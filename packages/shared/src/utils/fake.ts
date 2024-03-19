const words = 'abcdefghijklmnopqrstuvwxyz'

export function fakeEmail() {
  let email = ''
  let company = ''
  for (let i = 0; i < 10; i++)
    email += words[Math.floor(Math.random() * words.length)]

  email += '@'
  for (let i = 0; i < 5; i++)
    company += words[Math.floor(Math.random() * words.length)]

  email += `${company}.com`
  return email
}

export function fakeUrl() {
  let url = ''
  for (let i = 0; i < 10; i++)
    url += words[Math.floor(Math.random() * words.length)]

  url += '.com'
  return url
}
