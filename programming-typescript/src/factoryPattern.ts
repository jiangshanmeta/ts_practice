type Shoe = {
    purpose:string;
}

class BalletFlat implements Shoe{
    purpose = 'dancing'

}

class Boot implements Shoe{
    purpose = 'woodcutting'    
}

class Sneaker implements Shoe{
    purpose = 'walking'    
}

let Shoe = {
    create(type:'BalletFlat' | 'Boot' | 'Sneaker'):Shoe{
        switch(type){
            case 'BalletFlat':
                return new BalletFlat();
            case 'Boot':
                return new Boot()
            case 'Sneaker':
                return new Sneaker();
        }
    }
}

const shoe = Shoe.create('Sneaker')