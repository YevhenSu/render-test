const reverse = string => {
  return string
    .split( '' )
    .reverse()
    .join( '' )
}

const average = array => {
  const reducer = ( acc, val ) => acc + val
  return array.length === 0 ? 0 : array.reduce( reducer, 0 ) / array.length
}

module.exports = {
  reverse,
  average
}
