export function parseCalibration(lines: string[], parseNumberStrings: boolean) {
  let total = 0
  const numberStrings: { [key: string]: string } = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  }

  for (const line of lines) {
    const regexString = Object.keys(numberStrings)
      .reduce(
        (all, key) =>
          parseNumberStrings ? [...all, key, numberStrings[key]] : [...all, numberStrings[key]],
        new Array<string>()
      )
      .join('|')
    const matches = Array.from(line.matchAll(new RegExp(`(?=(${regexString}))`, 'g')))
    const first = matches[0][1]
    const last = matches[matches.length - 1][1]

    total += Number(
      first.replace(new RegExp(regexString), (val) => numberStrings[val] ?? val) +
        last.replace(new RegExp(regexString), (val) => numberStrings[val] ?? val)
    )
  }
  return total
}
