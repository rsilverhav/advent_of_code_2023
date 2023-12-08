interface Point {
  x: number
  y: number
}

export function findEngineParts(schematic: string[]) {
  const height = schematic.length
  const width = schematic[0].length
  let sum = 0

  const getAdjacentAboveBelow = (point: Point) => {
    const points: Point[] = []

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) {
          continue
        }
        if (
          point.x + dx >= 0 &&
          point.x + dx < width &&
          point.y + dy >= 0 &&
          point.y + dy < height
        ) {
          points.push({ x: point.x + dx, y: point.y + dy })
        }
      }
    }

    return points
  }

  let currentNumberStr = ''
  let isValid = false
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const char = schematic[y][x]

      if (/\d/.test(char)) {
        currentNumberStr += char

        const adjacentPoints = getAdjacentAboveBelow({ x, y })
        for (const adjPoint of adjacentPoints) {
          if (/[^.\d]/.test(schematic[adjPoint.y][adjPoint.x])) {
            isValid = true
          }
        }
      }
      if (/[^\d]/.test(char) || x === width - 1) {
        if (currentNumberStr && isValid) {
          sum += Number(currentNumberStr)
        }
        isValid = false
        currentNumberStr = ''
      }
    }
  }

  return sum
}
