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

let arrA = [1,2,3]
let arrB = ['a','b']
let arrC :string[] = ['a']
let arrD = [1,'a']
const arrE = [1,'a']
let arrF = ['red']
arrF.push('red')
// arrF.push(true)
let arrG = []
arrG.push('')
arrG.push(1)

let arrH :number[] = []
arrH.push(1)
// arrH.push('1')

function buildArray(){
    const a = [];
    a.push(1);
    a.push('x')
    return a;
}

const myBuilded = buildArray();
// myBuilded.push(true)

let tupleA :[number] = [1]
let tupleB :[string,string,number] = ['a','b',1]
tupleB = ['c','d',2]

let trainFares:[number,number?][] = [
    [3.75],
    [1,2],
    [1,3]
]

let friends:[string,...string[]] = [
    '',
    '1',
    '22',
]

let list:[number,boolean,...string[]] = [1,true]

let readonlyA: readonly number[] = [1,2,3]
// readonlyA.push(1)

const enum Languages {
    English,
    Spanish,
    Russian,
}

let myFirstLanguage = Languages.English;
let mySecondLanguage = Languages.Spanish;
// let myThirdL = Languages.TT;

let meow = null; // 推断为any？？？