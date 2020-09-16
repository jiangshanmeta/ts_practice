let aa:any = 6;
let bb :any = ["88"]
let cc = aa+bb
let dd:unknown = 30
let ee = dd === 123
if(typeof dd === 'number'){
    let ff = dd+10;
}

const str1 = '!'

let danger:{}

danger = {a:1}
danger = {a:[]}

type Age = number;

type Person = {
    name:string;
    age:Age;
}

let person :Person = {
    name:'1',
    age:3,
}

type Cat = {
    name:string,
    purrs:boolean,
}

type Dog = {
    name:string,
    barks:boolean,
    wags:boolean,
}

type CarOrDog = Cat | Dog;

const cat:Cat = {
    name:'a',
    purrs:true,
}

const catOrDogCat :CarOrDog = cat

const catOrDog:CarOrDog = {
    name:'',
    barks:false,
    wags:true,
}