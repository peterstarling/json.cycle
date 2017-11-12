import R from 'ramda';

export default R.pipe(
    R.unapply(R.identity),
    R.converge(
        console.log,
        [
            R.pipe(
                R.slice(0, 1),
                R
            )
        ]
    )
);
