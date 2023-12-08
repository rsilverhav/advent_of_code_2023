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

  it('parses the given test data with edge number', () => {
    const testData = ['4....114', '....*...']
    expect(findEngineParts(testData)).toBe(114)
  })
})
