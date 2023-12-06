import { parseCalibration } from '../parseCalibration'

const testData: string[] = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']

describe('parseCalibration', () => {
  it('parses the given test data', () => {
    expect(parseCalibration(testData)).toBe(142)
  })
})
