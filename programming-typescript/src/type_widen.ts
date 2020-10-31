type Options = {
    baseUrl:string,
    cacheSize?:number,
    tier?:'prod'|'dev'
}

class API{
    constructor(private options:Options){

    }
}

// 此时会做多余属性检查
// 会有一个中间的 新鲜对象字面量类型
// new API({
//     baseUrl:'',
//     tierr:'prod',
// })


// 这时不会做多余属性检查
// 不存在新鲜对象字面量类型
const opt = {
    baseUrl:'',
    tierr:'prod'
}

new API(opt)

interface AB  {
    a:string,
    b:string,
}

interface CD {
    c:string,
    d:string,
}
