export function validateCubeGames(games: string[], maxValues: { [key: string]: number }) {
  let validIdSum = 0
  let minPowerSum = 0

  for (const game of games) {
    const [_, id, colorValues] = /Game (\d+): (.*)/.exec(game) ?? []
    const simplifiedGame = colorValues.replace(/;/g, ',')

    const gameMaxValues: { [key: string]: number } = {}

    for (const colorValue of simplifiedGame.split(',')) {
      const [_, __, value, color] = /(\s+)?(\d+) (\w+)/.exec(colorValue) ?? []
      if (typeof gameMaxValues[color] === 'undefined') {
        gameMaxValues[color] = 0
      }
      const numVal = Number(value)
      gameMaxValues[color] = numVal > gameMaxValues[color] ? numVal : gameMaxValues[color]
    }

    const isGameExceeding = Object.keys(gameMaxValues).find(
      (key) => gameMaxValues[key] > maxValues[key]
    )

    if (!isGameExceeding) {
      validIdSum += Number(id)
    }

    minPowerSum += Object.entries(gameMaxValues).reduce((sum, next) => sum * next[1], 1)
  }

  return { validIdSum, minPowerSum }
}
