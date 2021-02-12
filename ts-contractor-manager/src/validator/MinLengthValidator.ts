import {
    IValidator
} from './IValidator'

import {
    StringOrNull
} from 'src/types'

export class MinLengthValidator implements IValidator<StringOrNull>{
    private minLength:number;
    constructor(minLength:number){
        this.minLength = minLength;
    }
    public isValid(input:StringOrNull){
        if(!input){
            return false;
        }
        return input.length>=this.minLength;
    }

}