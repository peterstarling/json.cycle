import R from 'ramda';

/**
 * Find references of an object in an array
 * 
 * @param {Array} arr List of objects with references
 * @param {*} obj Object to find previous references to in the object list
 */
export default R.unapply(
    R.converge(
        R.pipe(
            // find element with object and reference
            R.find,
            // extract reference only or return false if not found (undefined)
            R.ifElse(R.isNil, () => false, R.head)
        ),
        // apply functions to arguments
        [
            R.pipe(
                // take last argument (arr)
                R.last,
                // create a conditional
                focus => elem => focus === elem[1]
            ),
            // take the first argument (obj)
            R.head
        ]
    )
);

