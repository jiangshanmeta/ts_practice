import { IPersonState } from "src/Stats";

export interface IValidation{
    Validate(state:IPersonState,errors:string[]):void;
}