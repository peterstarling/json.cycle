import test from 'ava';
import '../src/json-encode-cycles';

test('it should replace a reference to the same object with path to main object', (t) => {
    const input = { a: 'asdas', b: { ba: 'asdas' } };
    input.b.bb = input;

    const expected = JSON.stringify({ a: input.a, b: { ba: input.b.ba, bb: { $ref: '$' } } });

    const output = JSON.encodeCycles(input);

    t.deepEqual(output, expected);
});