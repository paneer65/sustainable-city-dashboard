import React, { Component } from 'react';
import ReactDOM,{unmountComponentAtNode} from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import Dashboard from './components/dashboard/Dashboard';
import Filters from './components/filters/Filters';
import { MemoryRouter, matchPath }  from 'react-router-dom';
import Map from './components/map/Map';
import { shallow } from 'enzyme';
import * as idx from './components/login/index';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
// import sinon from 'sinon';

import { AuthContext } from "./context/auth";
import { setAuthenticated, setJWTToken, getJWTToken, deleteJWTToken } from "./test-helpers/context-wrapper";


Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  // container *must* be attached to document so events work correctly.
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('dashboard renders correctly', () => {
  const tree = renderer.create(
    <AuthContext.Provider value={{
        isAuthenticated: false, setIsAuthenticated: setAuthenticated, setJWTToken, getJWTToken, deleteJWTToken
      }}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </AuthContext.Provider>
  ).toJSON();
  // expect(tree).toMatchSnapshot();
});


idx.Login = jest.fn();

it('renders login correctly',()=>{

});

it('check state of dashboard filter once rendered', () => {
  let classInstance = shallow(<Dashboard />);
  let initialState = classInstance.state().selectedFilter;
  expect(initialState).toBe('Traffic');
});


// it('check state after button click on dashboard', () => {
//   const mockButtonClick = jest.fn();
//   let classInstance = shallow(<Dashboard />);
//   let initialState = classInstance.state().selectedFilter;
//   console.log(initialState);
//
//   const onButtonClick = sinon.spy();
//   const wrapper = shallow(<Filters onButtonClick={onButtonClick} />);
//   wrapper.find('button').simulate('click');
//   expect(onButtonClick).toHaveProperty('callCount', 1);
//
//   /*
//   let childInstance = shallow(<Filters />);
//   console.log(childInstance.find('.filterButton2'));
//   childInstance.find('.filterButton2').simulate('click');
//
//   let updatedState = classInstance.state().selectedFilter;
//   console.log(updatedState)
//   expect(updatedState).toBe('Pollution');*/
// });
