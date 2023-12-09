export function calculateScratchcardPoints(scratchCards: string[]) {
  let sum = 0
  forEachCard(scratchCards, ({ matchingNumbers }) => {
    sum += matchingNumbers.reduce((points) => (!points ? 1 : points * 2), 0)
  })
  return sum
}

export function processWinningScratchcards(scratchCards: string[]) {
  const cardCopies: { [key: number]: number } = {}

  forEachCard(scratchCards, ({ cardNumber, matchingNumbers }) => {
    cardCopies[cardNumber] = (cardCopies[cardNumber] ?? 0) + 1
    for (
      let i = cardNumber + 1;
      i <= cardNumber + matchingNumbers.length && i <= scratchCards.length;
      i++
    ) {
      cardCopies[i] = (cardCopies[i] ?? 0) + cardCopies[cardNumber]
    }
  })
  return Object.keys(cardCopies).reduce((sum, key) => sum + cardCopies[Number(key)], 0)
}

function forEachCard(
  scratchCards: string[],
  onWinningCard: (info: { cardNumber: number; matchingNumbers: number[] }) => void
) {
  for (const card of scratchCards) {
    const regexRes = /Card\s+(\d+).*: (.*) \| (.*)/.exec(card)
    if (regexRes == null || regexRes.length !== 4) {
      throw new Error(`Unexpected formatted card: ${card}`)
    }
    const [_, cardId, winningNumbersStr, numbersStr] = regexRes

    const winningNumbers = new Set(winningNumbersStr.split(/\s+/).map((str) => Number(str)))
    const matchingNumbers = numbersStr
      .split(/\s+/)
      .map((str) => Number(str))
      .filter((next) => winningNumbers.has(next))
    onWinningCard({ cardNumber: Number(cardId), matchingNumbers })
  }
}
