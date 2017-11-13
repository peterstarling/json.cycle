import test from 'ava';
import findRef from '../src/find-ref';

test('it should not find reference to an object', (t) => {
    const obj = {};
    const arr = [
        ['$', { test: 'test 2' }],
        ['$.prop_name', 231],
        ['$.prop_name[1]', {}],
    ];

    const output = findRef(arr, obj);

    t.false(output);
});

test('it should find reference to an object', (t) => {
    const obj = { test: 'test 1'};
    const arr = [
        ['$', { test: 'test 2' }],
        ['$.prop_name', 231],
        ['$.prop_name[1]', obj],
    ];

    const output = findRef(arr, obj);
    
    t.is(output, '$.prop_name[1]');
});
