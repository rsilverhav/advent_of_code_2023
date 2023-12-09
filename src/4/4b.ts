import { readInput } from '../readInput'
import { processWinningScratchcards } from './calculateScratchcardPoints'

const input = readInput('./src/4/input_4')

console.log('4b: ', processWinningScratchcards(input))
