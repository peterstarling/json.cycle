import test from 'ava';
import addRef from '../src/add-ref';

test.only('it should add a reference to a base object', (t) => {
    const output = addRef([], [], 'some val');

    t.deepEqual(output, [['$', 'some val']]);
});

test('it should add a reference to a property in an object', (t) => {
    const output = addRef([['$', 'some val']], ['prop_name'], 'some other val');

    t.deepEqual(output, [
        ['$', 'some val'],
        ['$.prop_name', 'some other val']
    ]);
});

test('it should add a reference to an array in an object', (t) => {
    const output = addRef([], ['prop1', 3], 'some val');

    t.deepEqual(output, [['$.prop1[3]', 'some val']]);
});