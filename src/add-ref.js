import R from 'ramda';

/**
 * Append element with reference to the list
 * 
 * @param {Array}   arr     List of previous references
 * @param {Array}   path    Property path
 * @param {*}       val     Mixed value to append to the list of references
 */
export default R.curry((arr, path, val) => R.append(
    [
        '$' + path.map(a => (typeof a === 'number' ? `[${a}]` : `.${a}`)).join(''),
        val
    ],
    arr
));
