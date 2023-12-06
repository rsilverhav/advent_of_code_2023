import * as fs from 'fs'

export function readInput(path: string): string[] {
  const fileData = fs.readFileSync(path)
  const rows = fileData.toString().split('\n')
  // Last line has a \n, removing the empty element
  rows.pop()
  return rows
}

export function readNumberInput(path: string): number[] {
  let stringArr = readInput(path)
  if (stringArr.length === 1 && stringArr[0].includes(',')) {
    stringArr = stringArr[0].split(',')
  }
  return stringArr.map((s) => {
    const num = Number(s)
    if (Number.isNaN(num)) {
      throw new Error('Failed reading number inputs')
    } else {
      return num
    }
  })
}
