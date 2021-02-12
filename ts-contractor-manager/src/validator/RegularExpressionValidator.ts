import {
    IValidator
} from './IValidator'

import {
    StringOrNull
} from 'src/types'

export class RegularExpressionValidator implements IValidator<StringOrNull>{
    private regex:RegExp;
    constructor(exporession:string){
        this.regex = new RegExp(exporession)
    }
    public isValid(input:StringOrNull){
        if(!input){
            return false;
        }
        return this.regex.test(input)
    }
}