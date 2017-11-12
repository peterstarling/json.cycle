import R from 'ramda';

const mapNested = R.curry(
    (cond, list) => R.when(
        R.either(R.is(Array), R.is(Object)),
        R.converge(
            (isArr, obj) => isArr ? R.values(obj) : obj,
            [
                R.is(Array),
                R.mapObjIndexed(
                    R.pipe(
                        cond,
                        R.when(
                            R.either(R.is(Array), R.is(Object)),
                            a => mapNested(cond, a)
                        )
                    )
                )
            ]
        )
    )(list)
);

export default mapNested;