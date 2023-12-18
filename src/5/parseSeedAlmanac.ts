type AlmenacNode = { value: number; mapping: string }
type Mapping = Record<
  string,
  { mapping: string; srcRangeFrom: number; destRangeFrom: number; range: number }[]
>

export function parseSeedAlmanac(almanacData: string[]) {
  const _almanacData = [...almanacData]
  const seedsRow = _almanacData.splice(0, 1)[0]
  const seeds = seedsRow
    .replace('seeds: ', '')
    .split(' ')
    .map((s) => Number(s))

  const mappingDirections: Record<string, string> = {}

  const allMappings: Mapping = {}

  let currentMapFrom = 'seed'
  let currentMapTo = 'seed'
  for (const almanacRow of _almanacData.filter((row) => row !== '')) {
    const regexRes = /(\w+)-to-(\w+) map:/.exec(almanacRow)
    if (regexRes != null && regexRes.length === 3) {
      currentMapFrom = regexRes[1]
      currentMapTo = regexRes[2]
      mappingDirections[currentMapFrom] = currentMapTo

      if (typeof allMappings[currentMapFrom] === 'undefined') {
        allMappings[currentMapFrom] = []
      }
    } else {
      const [destStart, srcStart, range] = almanacRow.split(' ').map((s) => Number(s))
      allMappings[currentMapFrom].push({
        mapping: currentMapTo,
        srcRangeFrom: srcStart,
        range,
        destRangeFrom: destStart,
      })
    }
  }

  let lowestLocation = Number.MAX_VALUE
  for (let seed of seeds) {
    const resp = recursiveSearch({
      node: {
        mapping: 'seed',
        value: seed,
      },
      allMappings,
      mappingDirections,
    })
    lowestLocation = Math.min(lowestLocation, resp.value)
  }

  return lowestLocation
}

const recursiveSearch = ({
  node,
  mappingDirections,
  allMappings,
}: {
  node: AlmenacNode
  mappingDirections: Record<string, string>
  allMappings: Mapping
}): AlmenacNode => {
  if (node.mapping === 'location') {
    return node
  } else {
    const matchingMapping = allMappings[node.mapping].find(
      (mapping) =>
        node.value >= mapping.srcRangeFrom && node.value < mapping.srcRangeFrom + mapping.range
    )
    const value = matchingMapping
      ? matchingMapping.destRangeFrom + node.value - matchingMapping.srcRangeFrom
      : node.value

    const targetMapping = mappingDirections[node.mapping]

    return recursiveSearch({
      node: {
        mapping: targetMapping,
        value,
      },
      allMappings,
      mappingDirections,
    })
  }
}
