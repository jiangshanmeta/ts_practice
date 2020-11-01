function tuple<
    T extends unknown[]
>(...ts:T):T{
    return ts;
}
// [number,boolean]
const tupleValue = tuple(1,true)