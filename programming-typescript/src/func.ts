function greet(name:string):string{
    return 'hello ' + name;
}

function log(message:string,userId?:string){
    console.log(message,userId || 'Not signed in');
}

function log2(message:string,userId='Not signed in'){
    console.log(message,userId);
}

type Context = {
    appId?:string,
    userId?:string
}

function log3(message:string,context:Context = {}){
    console.log(message,context.userId);
}

function sum(...numbers:number[]):number{
    return numbers.reduce((total,item)=>{
        return total+item;
    },0)
}

function fancyDate(this:Date):void{
    console.log(this.getDate())
}

type Greet = (name:string)=>string;
type Sum = (...numbers:number[]) => number;
type Log = (message:string,userId?:string)=>void;

let log4:Log = (message,userId='Not Login')=>{
    console.log(message,userId)
}

type Log2 = {
    (message:string,userId?:string):void;
}