import R from 'ramda';
import test from 'ava';
import replaceJsonPath from '../src/replace-json-path';

test('it should replace a reference to the same object with path to main object', (t) => {
    const input = { a: 'asdas', b: { ba: 'asdas' } };
    input.b.bb = input;

    const expected = { a: input.a, b: { ba: input.b.ba, bb: { $ref: '$' } } };

    const output = replaceJsonPath(input);

    t.deepEqual(output, expected);
});

test('it should replace a reference to the same object with path in nested object', (t) => {
    const input = { a: 'asdas', b: { ba: 'asdas' } };
    input.b.bb = input.b;

    const expected = { a: input.a, b: { ba: input.b.ba, bb: { $ref: '$.b' } } };

    const output = replaceJsonPath(input);

    t.deepEqual(output, expected);
});

test('it should replace a reference to the same array with base array', (t) => {
    const myArray = [1, 'a'];
    myArray[2] = myArray;

    const expected = [1, 'a', { $ref: '$' }];
    const output = replaceJsonPath(myArray);

    t.deepEqual(output, expected);
});
