import test from 'ava';
import traverse from '../src/traverse';

test('it should list all object properties', (t) => {
    const input = { a: 'property 1', b: 'property 2', c: 'property 3' };

    t.deepEqual(traverse(input), ['property 1', 'property 2', 'property 3']);
});

test('it should list all object properties', (t) => {
    const input = ['element 1', 'element 2', 'element 3'];

    t.deepEqual(traverse(input), ['element 1', 'element 2', 'element 3']);
});

test('it should list all nested object properties', (t) => {
    const input = { a: 'property 1', b: 'property 2', c: 'property 3', d: { a: 'property 4'}};
    const output = traverse(input);

    t.deepEqual(output, ['property 1', 'property 2', 'property 3', { a: 'property 4' }, 'property 4']);
});

test('it should list all nested object properties with condition', (t) => {
    const input = { a: 'property 1', b: 'property 2', c: 'property 3', d: { a: 'property 4' }};
    const output = traverse(input, elem => !elem.a || elem.a !== 'property 4');

    t.deepEqual(output, ['property 1', 'property 2', 'property 3']);
});
