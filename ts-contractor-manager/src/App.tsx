import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';

import {
  IPersonState
} from './Stats'


import Container from 'reactstrap/lib/Container'
import PersonalDetails from './PersonalDetails'



export default class App extends React.Component{
	private defaultPerson:IPersonState = {
		FirstName:'',
		LastName:''
	}
	public render(){
		return (
			<Container>
			  <PersonalDetails DefaultState={this.defaultPerson}/>
			</Container>
		);
	}
}
