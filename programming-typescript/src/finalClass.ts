
class MessageQueen{
    // 构造函数标为私有 无法被extends 无法在外部被new实例化
    private constructor(private message:string[]){

    }

    static create(message:string[]){
        return new MessageQueen(message)
    }
}

const mq = MessageQueen.create(['1'])