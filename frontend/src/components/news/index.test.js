import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import NewsIndex from "./index";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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

it("Fetches news data", () => {

  let newsItems = [
    {
      source: "Irishmirror.ie",
      title: "Coronavirus Ireland: Dublin hospital chief confirms intensive care unit is now full - Irish Mirror",
      description: "However Dr Colman O'Loughlin claimed that an extra 18 beds can be added in the nearby high dependency unit",
      url: "https://www.irishmirror.ie/news/irish-news/coronavirus-ireland-update-covid-dublin-21832237",
      url_to_image: "https://i2-prod.irishmirror.ie/incoming/article11626449.ece/ALTERNATES/s1200/1_irish-breaking-news-logo-stock-generic-irish-mirror.png",
      published_at: "2020-04-08T08:32:13Z"
    }
  ];
  let mock = new MockAdapter(axios);

  mock.onGet('/api/news').reply(200, {
    newsItems
  });

  act(() => {
    render(
      <NewsIndex />
    , container);
  });

  expect(container.querySelector("div")).toBeTruthy();
});
