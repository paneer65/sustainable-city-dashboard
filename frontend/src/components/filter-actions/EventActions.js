import Form from 'react-bootstrap/Form'
import React, { useState } from "react";



class EventActions extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      speedLimit: '',
      ongoingEvents : [],
      eventsGoingToStart : [],
      eventsGoingToEnd : [],
      endedEvents: [],
      eventsNotStarted: [],
      events_Categorised: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createEventCategories = this.createEventCategories.bind(this);
    this.removeSpeedLimit = this.removeSpeedLimit.bind(this);
    //this.createEventCategories(this.props.allMarkers)
  }

  componentDidUpdate(){
    if (!this.state.events_Categorised)
      this.createEventCategories(this.props.allMarkers)
  }

  handleChange(event) {
    this.setState({speedLimit: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let currentMarker = this.props.selectedMarker
    currentMarker.speed_limit = this.state.speedLimit
    this.props.updateSelectedMarker(currentMarker)
  }

  createEventCategories(events){
    console.log('esmond')
    let currentOngoingEvents = []
    let currentEventsGoingToStart = []
    let currentEventsGoingToEnd = []
    let currentEventsEnded = []
    let currentNotStartedEvents = []
    const today = new Date();
		let timeString = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    debugger;
    for (let key in events) {
			if (events.hasOwnProperty(key)) {
				let currentEvent = events[key]
				
				//Events going on now
        if(currentEvent.icon == 'yellow-dot.png')
          currentOngoingEvents.push(currentEvent)

				//Events going to start shortly
				else if(currentEvent.icon == 'red-dot.png')
          currentEventsGoingToStart.push(currentEvent)

        //Events going to end
				else if(currentEvent.icon == 'green-dot.png')
          currentEventsGoingToEnd.push(currentEvent)

        //Events ended  
				else if(currentEvent.icon == 'blue-dot.png')
          currentEventsEnded.push(currentEvent) 
          
        //Events not started
        else if(currentEvent.icon == 'ltblue-dot.png')
          currentNotStartedEvents.push(currentEvent) 
			}
    }
    this.setState({ongoingEvents: currentOngoingEvents});
    this.setState({eventsGoingToStart: currentEventsGoingToStart});
    this.setState({eventsGoingToEnd: currentEventsGoingToEnd});
    this.setState({endedEvents: currentEventsEnded});
    this.setState({eventsNotStarted: currentNotStartedEvents});
    this.setState({events_Categorised: true})
  }

  removeSpeedLimit(event){
    let currentMarker = this.props.selectedMarker
    currentMarker.speed_limit = null
    this.props.updateSelectedMarker(currentMarker)
    this.setState({ speedLimit : ''})
  }
  
  render() {
    return (
      <div className="EventActions">
        <img width="20" height="20" src="http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png"></img> Events Not Started {this.state.eventsNotStarted.length}<br/>
        <img width="20" height="20" src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"></img> Events Going to Start Shortly {this.state.eventsGoingToStart.length}<br/>
        <img width="20" height="20" src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"></img> Ongoing Events {this.state.ongoingEvents.length}<br/>
        <img width="20" height="20" src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"></img> Events Going to End Shortly {this.state.eventsGoingToEnd.length}<br/>
        <img width="20" height="20" src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"></img> Ended Events {this.state.endedEvents.length}<br/>
        {
          this.props.selectedMarker !== null &&
          <div>
            <br/><br/>
            Event Type: {this.props.selectedMarker.event_type} <br/>
            Name: {this.props.selectedMarker.event_name} <br/>
            Starts At: {this.props.selectedMarker.starts_at} &nbsp;
            Ends At: {this.props.selectedMarker.ends_at} <br/>
            Current Speed Limit: {this.props.selectedMarker.speed_limit} <br/>
            <br/>
            <div>
              {this.props.selectedMarker.speed_limit === null && "Set the speed limit" } 
              {this.props.selectedMarker.speed_limit !== null && "Update the speed limit" } 
              <form onSubmit={this.handleSubmit}>
                <input type="number" value={this.state.speedLimit} onChange={this.handleChange} /> &nbsp;
                <input type="submit" value="Submit" />
              </form>
            </div>
            <br/>
            <br/>
            {
              this.props.selectedMarker.speed_limit !== null && 
              <div>
                <form onSubmit={this.removeSpeedLimit}>
                  <input type="submit" value="Remove Speed Limit" />
                </form>
              </div>
            }
          </div>
        } 
      </div>
    )
  }
}

export default EventActions;
