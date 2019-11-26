import React from "react";
// import Traffic from '../traffic/Traffic';
import Dashboard from './Dashboard'
import TestAPI from './TestAPI'
import TestAPI2 from './TestAPI2'


export default function MainDashboard() {
	
	return (
		<div>
			<Dashboard/>
			<TestAPI/>
			<hr/>
			<TestAPI2/>
		</div>		
	);
}
