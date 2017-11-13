import R from 'ramda';
import replaceJsonPath from './replace-json-path';

/**
 * Stringify input with cyclic references
 * 
 * @param {mixed} input
 */
JSON.encodeCycles = R.pipe(
    // first replace any circular references with JSONPath reference string
    replaceJsonPath,
    // then stringify as normal
    JSON.stringify.bind(JSON)
);
