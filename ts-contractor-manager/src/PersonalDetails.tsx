import React from 'react'
import Button from 'reactstrap/lib/Button'
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import {
    IPersonState
} from './Stats'

import FormValidation from './FormValidation'

interface IProps {
    DefaultState:IPersonState
}

export default class PersonalDetails extends React.Component<IProps,IPersonState>{
    private defaultState:Readonly<IPersonState>;
    private canSave : boolean = false;
    constructor(props:IProps){
        super(props);
        this.defaultState = props.DefaultState;
        this.state = props.DefaultState
    }

    private updateBinding = (event:any)=>{
        switch(event.target.id){
            case 'firstName':
                this.setState({
                    FirstName:event.target.value
                });
                break;
            case 'lastName':
                this.setState({
                    LastName:event.target.value,
                })
        }
    }

    private userCanSave = (hasErrors:boolean)=>{
        this.canSave = hasErrors;
    }

    public render(){
        return (
            <Row>
                <Col lg="8">
                    <Row>
                        <Col>
                            <h4 className="mb-3">Personal details</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label
                                htmlFor="firstName"
                            >
                                first name
                            </label>
                        </Col>
                        <Col>
                            <label
                                htmlFor="lastName"
                            >
                                last name
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input 
                                type="text" 
                                id="firstName" 
                                className="form-control" 
                                placeholder="first name"
                                value={this.state.FirstName}
                                onChange={this.updateBinding}
                            />
                        </Col>
                       <Col>
                            <input
                                type="text"
                                id="lastName"
                                className="form-control"
                                placeholder="last name"
                                value={this.state.LastName}
                                onChange={this.updateBinding}
                            />
                       </Col> 
                    </Row>
                    <Row>
                        <FormValidation CurrentState={this.state} CanSave={this.userCanSave}/>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col lg="6">
                            <Button
                                size="lg"
                                color="success"
                            >load</Button>
                        </Col>
                        <Col lg="6">
                            <Button
                                size="lg"
                                color="info"
                            >
                                new
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}