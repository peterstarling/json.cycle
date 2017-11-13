import R from 'ramda';

const mapNested = R.curry(
    (cond, list, path = []) => R.when(
        R.either(R.is(Array), R.is(Object)),
        R.converge(
            (isArr, obj) => isArr ? R.values(obj) : obj,
            [
                R.is(Array),
                R.pipe(
                    R.mapObjIndexed(
                        R.pipe(
                            (val, key) => cond(val, R.append(key, path)),
                            
                        )
                    ),
                    R.mapObjIndexed(
                        R.converge(
                            (isTraversable, val, key) => isTraversable ? mapNested(cond, val, R.append(key, path)) : val,
                            [
                                R.either(R.is(Array), R.is(Object)),
                                R.identity,
                                (val, key) => key
                            ]
                        )
                    )
                )
            ]
        )
    )(list)
);

export default mapNested;