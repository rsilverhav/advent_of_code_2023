import { parseCalibration } from '../parseCalibration'

describe('parseCalibration', () => {
  const testData: string[] = ['six1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']
  it('parses the given test data', () => {
    expect(parseCalibration(testData, false)).toBe(142)
  })

  it('parses the given test data including numbers as string names', () => {
    const testData = [
      { str: 'two1nine', exptected: 29 },
      { str: 'eightwothree', exptected: 83 },
      { str: 'abcone2threexyz', exptected: 13 },
      { str: 'xtwone3four', exptected: 24 },
      { str: '4nineeightseven2', exptected: 42 },
      { str: 'zoneight234', exptected: 14 },
      { str: '7pqrstsixteen', exptected: 76 },
      { str: 'zoneight', exptected: 18 },
    ]

    for (const data of testData) {
      expect(parseCalibration([data.str], true)).toBe(data.exptected)
    }
  })
})
