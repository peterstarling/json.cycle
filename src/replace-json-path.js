import R from 'ramda';
import addRef from './add-ref';
import findRef from './find-ref';
import mapNested from './map-nested';

const cond = (input) => {
    let arr = addRef([], [], input);

    return (value, key) => {
        if (typeof value !== 'object') {
            return value;
        }

        const ref = findRef(arr, value);

        if (ref) {
            return { $ref: ref };
        }

        arr = addRef(arr, key, value);

        return value;
    };
};

export default input => mapNested(cond(input), input);
