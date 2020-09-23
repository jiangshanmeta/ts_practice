interface Food{
    calories:number
    tasty:boolean
}

interface Sushi extends Food{
    salty:boolean
}
interface Cake extends Food{
    sweet:boolean
}


interface Animal{
    readonly name:string
    eat(food:string):void
    sleep(hours:number):void
}

interface Feline{
    meow():void
}

class Cat1 implements Animal,Feline{
    name=''
    eat(food:string){

    }
    sleep(hour:number){

    }

    meow(){
        
    }
}