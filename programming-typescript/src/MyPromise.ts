type Executor<T> = (
    resolve:(result:T)=>void,
    reject:(error:unknown)=>void,
)=>void;

class MyPromise<T>{
    constructor(f:Executor<T>){

    }
    // TODO 实现
    then<U,F extends Error>(g:(result:T)=>MyPromise<U>):MyPromise<U>{

    }
    // TODO 实现
    catch<U,F extends Error>(g:(error:unknown)=>MyPromise<U>):MyPromise<U>{

    }

}