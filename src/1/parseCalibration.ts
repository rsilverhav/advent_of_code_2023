export function parseCalibration(lines: string[]) {
  let total = 0
  for (const line of lines) {
    const digits = line.replace(/[^\d]/g, '')
    total += Number(digits[0] + digits[digits.length - 1])
  }
  return total
}
