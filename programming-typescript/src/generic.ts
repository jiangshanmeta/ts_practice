type Filter = {
    <T>(array:T[],f:(item:T)=>boolean ):T[]
}

type Filter2<T> = {
    (array:T[],f:(item:T)=>boolean ):T[]
}

let filter2 :Filter2<number> = (arr,f)=>{
    const result = [];
    for(let i=0;i<arr.length;i++){
        if(f(arr[i])){
            result.push(arr[i])
        }
    }
    return result
}

function map<T,U>(arr:T[],f:(item:T)=>U):U[]{
    const result = [];
    for(let i=0;i<arr.length;i++){
        result[i] = f(arr[i]);
    }
    return result
}

let promise = new Promise<number>((resolve)=>{
    resolve(123)
})
promise.then((num)=>{
    return num*4
})

type MyEvent<T> = {
    target:T,
    type:string,
}

type ButtonEvent = MyEvent<number>;

type TreeNode = {
    value:string;
}

type LeadNode = TreeNode & {
    isLeaf:true
}

