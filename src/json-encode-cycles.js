import R from 'ramda';
import replaceJsonPath from './replace-json-path';

JSON.encodeCycles = R.pipe(
    replaceJsonPath,
    JSON.stringify.bind(JSON)
);
