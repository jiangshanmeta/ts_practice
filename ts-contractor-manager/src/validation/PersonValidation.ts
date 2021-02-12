import { IPersonState } from "src/Stats";
import { MinLengthValidator } from "src/validator/MinLengthValidator";
import { IValidation } from "./IValidation";

export class PersonValidation implements IValidation{
    private readonly firstNameValidator:MinLengthValidator = new MinLengthValidator(1);
    private readonly lastNameValidator:MinLengthValidator = new MinLengthValidator(2);

    public Validate(state:IPersonState,errors:string[]){
        if(!this.firstNameValidator.isValid(state.FirstName)){
            errors.push('first name need at least 1 character')
        }
        if(!this.lastNameValidator.isValid(state.LastName)){
            errors.push('last name need at least 2 character')
        }
    }

}