import R from 'ramda';

/**
 * Map an object recursively with a replacement condition
 * 
 * @param {function}    cond      Replacement condition function
 * @param {Array}       o         Object to traverse
 * @param {Array}       [path]    Base namespace 
 */
const mapNested = R.curry((cond, o, path = []) => R.when(
    // traverse only if is Array or Object
    R.either(R.is(Array), R.is(Object)),
    R.converge(
        // return as an array if was an Array initially
        (isArr, obj) => isArr ? R.values(obj) : obj,
        // list of functions to apply to 'o' param
        [
            R.is(Array),
            R.pipe(
                // map first level to apply replacement
                R.mapObjIndexed(R.pipe((val, key) => cond(val, R.append(key, path)),)),
                // map again and traverse recursively this time
                // it's necessary to map first level first to index all object occurences
                R.mapObjIndexed(R.converge(
                    (isTraversable, val, key) => isTraversable ? mapNested(cond, val, R.append(key, path)) : val,
                    [
                        R.either(R.is(Array), R.is(Object)),
                        R.identity,
                        (val, key) => key
                    ]
                ))
            )
        ]
    )
)(o));

export default mapNested;