import { findEngineParts } from '../findEngineParts'

describe('findEngineParts', () => {
  it('parses the given test data', () => {
    const testData = [
      '467..114..',
      '...*......',
      '..35..633.',
      '......#...',
      '617*......',
      '.....+.58.',
      '..592.....',
      '......755.',
      '...$.*....',
      '.664.598..',
    ]
    expect(findEngineParts(testData)).toBe(4361)
  })

  it('number different row same index start', () => {
    const testData = ['..35..633.', '......#...']
    expect(findEngineParts(testData)).toBe(633)
  })
  it('number different row same index start, symbol line before', () => {
    const testData = ['...*......', '..35..633.']
    expect(findEngineParts(testData)).toBe(35)
  })

  it('number on same row', () => {
    const testData = ['4*..123..*5.']
    expect(findEngineParts(testData)).toBe(9)
  })

  it('parses the given test data with edge number', () => {
    const testData = ['4....114', '....*...']
    expect(findEngineParts(testData)).toBe(114)
  })
})
