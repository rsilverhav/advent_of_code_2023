#/bin/bash
new_day="$1"
function_name="$2"


if [ -z "$new_day" ]; then
  echo "Missing day for script"
  exit 1
fi

if [ -z "$function_name" ]; then
  echo "Missing function_name for script"
  exit 1
fi

echo "$new_day $function_name"
new_dir="src/$new_day"
echo "Creating new dir $new_dir"
mkdir "$new_dir"
mkdir "$new_dir/spec"
echo "import { readInput } from '../readInput'
import { $function_name } from './$function_name'

const input = readInput('./src/$new_day/input_$new_day')

console.log('${new_day}a: ', $function_name(input))
" > "$new_dir/${new_day}a.ts"

echo "import { readInput } from '../readInput'
import { $function_name } from './$function_name'

const input = readInput('./src/$new_day/input_$new_day')

console.log('${new_day}b: ', $function_name(input))
" > "$new_dir/${new_day}b.ts"

echo "export function $function_name(){
throw new Error('impl')
}" > "$new_dir/$function_name.ts"

echo "import { $function_name } from '../$function_name'

const testData = []

describe('$function_name', () => {
  it('parses the given test data', () => {
    expect($function_name(testData)).toBe(0)
  })
})" > "$new_dir/spec/${function_name}Spec.ts"
