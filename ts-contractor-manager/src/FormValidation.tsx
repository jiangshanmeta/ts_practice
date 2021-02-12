import { IPersonState } from "./Stats";
import React from 'react'
import { IValidation } from "./validation/IValidation";
import { PersonValidation } from "./validation/PersonValidation";
import { Col, Row } from "reactstrap/lib";
interface IValidationProps{
    CurrentState:IPersonState,
    CanSave:(canSave:boolean)=>void;
}

export default class FormValidation extends React.Component<IValidationProps>{
    private failures:string[] = [];
    private validation:IValidation[];
    constructor(props:IValidationProps){
        super(props);
        this.validation = [];
        this.validation.push(new PersonValidation());
    }

    private Validate(){
        this.failures = [];
        this.validation.forEach((validation)=>{
            validation.Validate(this.props.CurrentState,this.failures);
        })
        this.props.CanSave(this.failures.length === 0);
    }

    render(){
        this.Validate();
        const errors = this.failures.map((failure)=>{
            return (
                <Row key={failure}>
                    <Col>
                        <label>{failure}</label>
                    </Col>
                </Row>
            )
        })

        return (
            <Col>
                {errors}
            </Col>
        )
    }
}
