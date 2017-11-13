import R from 'ramda';

export default R.unapply(
    R.converge(
        R.pipe(
            R.find,
            R.ifElse(R.isNil, () => false, R.head)
        ),
        [
            R.pipe(
                R.last,
                focus => elem => focus === elem[1]
            ),
            R.head
        ]
    )
);

