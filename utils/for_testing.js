const reverse = string => {
  return string
    .split( '' )
    .reverse()
    .join( '' )
}

const average = array => {
  const reducer = ( acc, val ) => acc + val
  return array.reduce( reducer, 0 ) / array.length
}

module.exports = {
  reverse,
  average
}
