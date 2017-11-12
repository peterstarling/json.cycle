import R from 'ramda';

const traverse = (list, condition = () => true) => R.pipe(
    R.values,
    R.filter(condition),
    R.map(R.when(R.is(Object), a => [a, traverse(a)])),
    R.flatten
)(list);

export default traverse;