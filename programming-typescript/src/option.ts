interface Option<T>{
    flapMap<U>(f:(value:T)=>None):None;
    flapMap<U>(f:(value:T)=>Option<U>):Option<U>;
    getOrElse(value:T):T
}

// 处理成功
class Some<T> implements Option<T>{
    constructor(
        private value:T,
    ){

    }

    flapMap<U>(f:(value:T)=>None):None
    flapMap<U>(f:(value:T)=>Some<U>):Some<U>
    flapMap<U>(f:(value:T)=>Option<U>):Option<U>{
        return f(this.value)        
    }

    getOrElse(){
        return this.value;
    }

}
// 处理失败
class None implements Option<never>{
    flapMap():None{
        return this;
    }

    getOrElse<U>(value:U):U{
        return value;
    }

}

function Option<T>(value:null|undefined):None;
function Option<T>(value:T):Some<T>;
function Option<T>(value:T):Option<T>{
    if(value === null || value === undefined){
        return new None;
    }
    return new Some(value);
}

const result = Option(6)
                .flapMap(n=>Option(n*3))
                .flapMap(n=>new None())
                .getOrElse(7)