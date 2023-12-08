export function calculateScratchcardPoints(scratchCards: string[]) {
  let sum = 0
  for (const card of scratchCards) {
    const regexRes = /Card.*: (.*) \| (.*)/.exec(card)
    if (regexRes == null || regexRes.length !== 3) {
      throw new Error(`Unexpected formatted card: ${card}`)
    }
    const [_, winningNumbersStr, numbersStr] = regexRes

    const winningNumbers = new Set(winningNumbersStr.split(/\s+/).map((str) => Number(str)))
    sum += numbersStr
      .split(/\s+/)
      .map((str) => Number(str))
      .reduce((all, next) => (winningNumbers.has(next) ? (!all ? 1 : all * 2) : all), 0)
  }
  return sum
}
