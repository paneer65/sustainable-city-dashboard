import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Map from "./Map";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';


let container = null;
let isAuthenticated = false;
const renderer = new ShallowRenderer();

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("Map loads with Traffic filter", () => {
    let wrapper = shallow(<Map selectedFilter={ 'Traffic' } />)

    const expected = {
		pollutionData: [],
		predictedPollutionData: [],
		bikesData: [],
		busData: [],
		selectedFilter: '',
		pollutionSourcesMerged: false,
		mergedPollutionData: [],
		selectedMarker: '',
		eventsData: []
    }
    expect(wrapper.state()).toEqual(expected);
});

it("Map loads with Event filter", () => {
    // act(() => {
    //     render(
    //       <Map />
    //     , container);
    // });

    let events = [
        {
            event_name:"CENTRAL INFS SCHOOL",
            longitude:-6.25492,
            latitude:53.351,
            starts_at:"08:00",
            ends_at:"13:00",
            event_type:"School"
        },
        {
            event_name:"CENTRAL INFS SCHOOL",
            longitude:-6.25492,
            latitude:53.351,
            starts_at:"08:00",
            ends_at:"13:00",
            event_type:"School"
        }
    ];
    let mock = new MockAdapter(axios);
    
    mock.onGet('/events/').reply(200, { events });

    let wrapper = shallow(<Map selectedFilter={ 'Events' } />)

    const expected = {
		pollutionData: [],
		predictedPollutionData: [],
		bikesData: [],
		busData: [],
		selectedFilter: '',
		pollutionSourcesMerged: false,
		mergedPollutionData: [],
		selectedMarker: '',
		eventsData: []
    }
    console.log()
    wrapper.update();
    expect(wrapper.state().eventsData.length).toBeGreaterThan(-1);
});