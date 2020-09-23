type Color = 'Black' | 'White'
type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

class Game{
    private pieces = Game.makePieces()

    private static makePieces(){
        return [
            new King('White','E',1)
        ]
    }
}

abstract class Piece{
    protected position:Position
    constructor(
        private readonly color:Color,
        file:File,
        rank:Rank,
    ){
        this.position = new Position(file,rank);
    }

    moveTo(position:Position){
        this.position = position;
    }

    abstract canMoveTo(position:Position):boolean
}

class Position{
    constructor(
        private file:File,
        private rank:Rank,
    ){

    }

    distanceFrom(position:Position){
        return {
            rank:Math.abs(position.rank-this.rank),
            file:Math.abs(position.file.charCodeAt(0)-this.file.charCodeAt(0)),
        }
    }    
}

class King extends Piece{


    canMoveTo(position:Position){
        const distance = this.position.distanceFrom(position);

        return distance.rank<2 && distance.file<2;
    }
}
// class Queen extends Piece{}
// class Bishop extends Piece{}
// class Knight extends Piece{}
// class Rook extends Piece{}
// class Pawn extends Piece{}


class MySet{
    add(val:number):this{
        console.log(val)
        return this;
    }
    has(val:number):boolean{
        return true;
    }
}

class SubSet extends MySet{
    delete(val:number):void{
        
    }
}