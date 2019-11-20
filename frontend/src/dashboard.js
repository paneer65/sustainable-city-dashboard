import React from 'react';
import Traffic from './traffic';
import './Dashboard.css';

function Dashboard() {
  return (
		<div className = "Dashboard">
			<div  className = "home">
				<div className="nav">
					<button type="button" className="bt">Home</button>
					<button type="button" className="bt">Logut</button>
				</div>
			</div>
			<div  className = "traffic">
				<Traffic/>
			</div>

			<div  className = "pollution">
				pollution
			</div>
			<div  className = "environment">
				environment
			</div>
			<div  className = "item6">
				whATEVER
			</div>
		</div>
  );
}

export default  Dashboard;