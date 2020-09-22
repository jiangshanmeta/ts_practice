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

type InnerNode = TreeNode & {
    children:[TreeNode] | [TreeNode,TreeNode]
}

function mapNode<T extends TreeNode>(
    node:T,
    f:(value:string)=>string,
):T{
    return {
        ...node,
        value:f(node.value)
    }
}

const nodeA:TreeNode = {
    value:'1'
}

const nodeB:LeadNode = {
    value:'1',
    isLeaf:true,
}

const nodeC:InnerNode = {
    value:'1',
    children:[nodeB],
}

const nodeA1 = mapNode(nodeA,(item)=>item.toUpperCase());
const nodeB1 = mapNode(nodeB,(item)=>item.toUpperCase());
const nodeC1 = mapNode(nodeC,(item)=>item.toLowerCase());

type HasSides = {
    numberOfSides:number,    
}

type SidesHaveLength = {
    sideLength:number,
}

function logPerimeter<Shape extends HasSides & SidesHaveLength>(s:Shape){
    console.log(s.numberOfSides*s.sideLength)
    return s;
}

function call<T extends unknown[],R>(
    f:(...args:T)=>R,
    ...args:T
):R{
    return f(...args)
}