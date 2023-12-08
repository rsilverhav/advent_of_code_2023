export function findEngineParts(schematic: string[]) {
  let sum = 0

  forEachSchematicSymbol({
    schematic,
    symbolRegex: /[^.\d]/g,
    onValidNumbers: (validNumbers) => {
      sum += validNumbers.reduce((sum, next) => sum + Number(next), 0)
    },
  })

  return sum
}

export function findGears(schematic: string[]) {
  let sum = 0

  forEachSchematicSymbol({
    schematic,
    symbolRegex: /[\*]/g,
    onValidNumbers: (validNumbers) => {
      if (validNumbers.length === 2) {
        sum += validNumbers.reduce((sum, next) => sum * Number(next), 1)
      }
    },
  })

  return sum
}

function forEachSchematicSymbol({
  schematic,
  symbolRegex,
  onValidNumbers,
}: {
  schematic: string[]
  symbolRegex: RegExp
  onValidNumbers: (validNumbers: number[]) => void
}) {
  for (const [row, line] of schematic.entries()) {
    const symbolMatches = Array.from(line.matchAll(symbolRegex))
    for (const symbolMatch of symbolMatches) {
      const symbolMatchIndex = symbolMatch.index

      if (typeof symbolMatchIndex === 'undefined') {
        throw new Error(`Symbol match missing index: ${JSON.stringify(symbolMatch)}`)
      }

      const allNumberMatches = [-1, 0, 1].reduce(
        (all, rowDelta) => [
          ...all,
          ...Array.from((schematic[row + rowDelta] ?? '').matchAll(/(\d+)/g)),
        ],
        new Array<RegExpMatchArray>()
      )

      const validNumbers = allNumberMatches
        .filter((numberMatch) => {
          const numberMatchIndex = numberMatch.index
          if (typeof numberMatchIndex === 'undefined') {
            throw new Error(`Number match error missing index: ${JSON.stringify(numberMatch)}`)
          }
          return (
            numberMatchIndex + numberMatch[0].length >= symbolMatchIndex &&
            numberMatchIndex <= symbolMatchIndex + 1
          )
        })
        .map((numberMatch) => Number(numberMatch[0]))

      onValidNumbers(validNumbers)
    }
  }
}
