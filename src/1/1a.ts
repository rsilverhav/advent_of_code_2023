import { readInput } from '../readInput'
import { parseCalibration } from './parseCalibration'

const input = readInput('./src/1/input_1')

console.log('1a: ', parseCalibration(input, false))
