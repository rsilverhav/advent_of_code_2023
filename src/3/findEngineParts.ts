export function findEngineParts(schematic: string[]) {
  let sum = 0

  for (const [row, line] of schematic.entries()) {
    const symbolMatches = Array.from(line.matchAll(/[^.\d]/g))
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
        .map((numberMatch) => numberMatch[0])

      sum += validNumbers.reduce((sum, next) => sum + Number(next), 0)
    }
  }

  return sum
}
