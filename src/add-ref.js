import R from 'ramda';


export default R.curry((arr, path, val) => R.append(
    [
        '$' + path.map(a => typeof a === 'number' ? ('[' + a + ']') : ('.' + a)).join(''),
        val
    ],
    arr
));