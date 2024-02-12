function genKey() {
  const format1 = [9, 9, 9, 5]
  const format2 = [8, 8, 8, 8]
  const format = [format1, format2]
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < format.length; i++) {
    for (let j = 0; j < format[i].length; j++) {
      for (let k = 0; k < format[i][j]; k++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      if (j !== format[i].length - 1) result += '-';
    }
    if (i !== format.length - 1) result += '\n';
  }
  return result;
}

console.log(genKey());