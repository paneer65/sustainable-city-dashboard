import React from "react";
// import Traffic from '../traffic/Traffic';
import Dashboard from './Dashboard'
import TestAPI from './TestAPI'
import TestAPI2 from './TestAPI2'
import TestAPI3 from './TestAPI3'
import Pollution from '../pollution/Pollution'


export default function MainDashboard() {
	
	return (
		<div>
			<Dashboard/>
			<hr/>
			<TestAPI/>
			<hr/>
			<TestAPI2/>
			<hr/>
			<Pollution/>
			<hr/>
		</div>
	);
}
