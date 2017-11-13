import R from 'ramda';
import addRef from './add-ref';
import findRef from './find-ref';
import mapNested from './map-nested';

const cond = (input) => {
    // create a reference list for the upcoming closure
    let arr = addRef([], [], input);

    // return conditional function
    return (value, key) => {
        // if it is not an object then no need to look references to it 
        if (typeof value !== 'object') {
            return value;
        }

        // find a reference in the list
        const ref = findRef(arr, value);

        // if found then return a reference object
        if (ref) {
            return { $ref: ref };
        }

        // otherwise replace the reference list with appended element
        arr = addRef(arr, key, value);

        return value;
    };
};

/**
 * Replaces circular occurences with reference
 * 
 * @param {*} input Mixed input to traverse in order to replace circular references
 */
export default input => mapNested(cond(input), input);
