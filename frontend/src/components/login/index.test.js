import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { AuthContext } from "../../context/auth";
import { setAuthenticated, setJWTToken, getJWTToken, deleteJWTToken } from "../../test-helpers/context-wrapper";
import Login from "./index";

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

it("renders login fields", () => {

  act(() => {
    render(
      <AuthContext.Provider value={{
          isAuthenticated, setIsAuthenticated: setAuthenticated, setJWTToken, getJWTToken, deleteJWTToken
        }}>
        <Login />
      </AuthContext.Provider>
    , container);
  });

  expect(container.querySelector("#username-field")).toBeTruthy();
  expect(container.querySelector("#password-field")).toBeTruthy();
});
