import R from 'ramda';
import test from 'ava';
import mapNested from '../src/map-nested';

test('it should clone the object without change', (t) => {
    const input = { a: 'property 1', b: 'property 2', c: 'property 3' };
    const output = mapNested(a => a, input);

    t.deepEqual(output, input);
});

test('it should replace a property in object without nesting', (t) => {
    const input = { a: 'property 1', b: 'property 2', c: 'property 3' };
    const output = mapNested(a => a === 'property 2' ? 'something else' : a, input);

    t.deepEqual(output, { a: input.a, b: 'something else', c: input.c});
});

test('it should replace a property in object with nesting', (t) => {
    const input = { a: 'property 1', b: { d: 'property 3' }, c: 'property 2' };
    const output = mapNested(a => a === 'property 3' ? 'something else' : a, input);

    t.deepEqual(output, { a: input.a, b: { d: 'something else' }, c: input.c });
});

test('it should clone the array without change', (t) => {
    const input = ['value 1', 'value 2', 'value 3'];
    const output = mapNested(a => a, input);

    t.deepEqual(output, input);
});

test('it should replace the value in the array without nesting', (t) => {
    const input = ['value 1', 'value 2', 'value 3'];
    const output = mapNested(a => a === 'value 2' ? 'something else' : a, input);

    t.deepEqual(output, ['value 1', 'something else', 'value 3']);
});

test('it should replace the value in the array with nesting', (t) => {
    const input = ['value 1', 'value 2', ['value 4', 'value 5'], 'value 3'];
    const output = mapNested(a => a === 'value 4' ? 'something else' : a, input);

    t.deepEqual(output, ['value 1', 'value 2', ['something else', 'value 5'], 'value 3']);
});

test('it should replace a property in an object nested in an array', (t) => {
    const input = ['value 1', 'value 2', { a: 'property 1', b: 'property 2' }, 'value 3'];
    const output = mapNested(a => a === 'property 1' ? 'something else' : a, input);

    t.deepEqual(output, ['value 1', 'value 2', { a: 'something else', b: 'property 2' }, 'value 3']);
});

test('it should replace a property using key in an object nested in an array', (t) => {
    const input = ['value 1', 'value 2', { a: 'property 1', b: 'property 2' }, 'value 3'];
    const output = mapNested((val, key) => R.equals(key, ['2', 'b']) ? 'something else' : val, input);

    t.deepEqual(output, ['value 1', 'value 2', { a: 'property 1', b: 'something else' }, 'value 3']);
});
