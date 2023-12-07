import { readInput } from '../readInput'
import { validateCubeGames } from './validateCubeGames'

const input = readInput('./src/2/input_2')

console.log('2a: ', validateCubeGames(input, { red: 12, green: 13, blue: 14 }).validIdSum)
