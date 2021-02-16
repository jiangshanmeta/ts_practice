type MyPartial<T> = {
    [P in keyof T]?:T[P]
}

interface A {
    x:number;
    y:number;
}

type pritialA = MyPartial<A>

type MyRequired<T> = {
    [P in keyof T]-?:T[P]
}

interface B {
    x?:number;
    y?:number;
}

type requiredB = MyRequired<B>

type MyReadonly<T> = {
    readonly [P in keyof T]:T[P]
}

type readonlyA = MyReadonly<A>

// important
type MyRecord<K extends keyof any,T> = {
    [P in K]:T
}

type recordK = 'x'|'y'

// type aaa = keyof any

type recordT = number;

type recordKT = MyRecord<recordK,recordT>

type MyPick<T,K extends keyof T> = {
    [P in K]:T[P]
}

interface pickA {
    x:number;
    y:string;
}

type pick0 = MyPick<pickA,'y'>

type MyExclude<T,U> = T extends U?never:T;

type exclude0 = MyExclude<'a'|'b'|'c','a'>

// important
type MyOmit<T,K extends keyof T> = Pick<T,Exclude<keyof T,K>>

interface omitA  {
    x:number;
    y:number;
}

type typeOmitA = MyOmit<omitA,'x'>

type MyExtract<T,U> = T extends U?T:never

type MyNonNullable<T> = T extends null|undefined?never:T;

type tNonNullable = MyNonNullable<string|null|undefined>

type MyParameters<T extends (...args:any)=>any> = T extends (...args:infer U)=>any? U:never;

type paraT0 = MyParameters<(x:string,y:number)=>string>

type MyConstructorParameters<T extends new (...arg:any)=>any> = T extends new (...arg:infer U)=>any?U:never;

type testConstructorParameters = MyConstructorParameters<new (x:number,y:string)=>void>

type MyReturnType<T extends (...args:any)=>any> = T extends (...args:any)=>infer U?U :never;

type testReturnType = MyReturnType<()=>string>

type MyInstanceType<T extends new (...args:any)=>any> = T extends new (...args:any)=>infer U?U:never;

class C{
    x = 0;
}

type testMyInstaceType = MyInstanceType<typeof C>

type MyThisParameters<T> = T extends (this:infer U,...args:any)=>any?U:unknown;

function f0(this:object){

}

type testMyThisParameters = MyThisParameters<typeof f0>
