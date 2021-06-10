
import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import App from './login.component';
import { Button } from '@material-ui/core';
import DashboardComponent from './website-dashboard.component';
import { Dashboard } from '@material-ui/icons';
import {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

let container: HTMLDivElement;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

test('renders title', () => {
  render(<DashboardComponent />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders grouping select with initial state', () => {
  render(<DashboardComponent />);
  const linkElement = screen.getByText(/Day/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders date to', () => {
  render(<DashboardComponent />);
  const linkElement = screen.getByText(/Date to/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders date from', () => {
  render(<DashboardComponent />);
  const linkElement = screen.getByText(/Date from/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders as many buttons as the name list length', () => {
  render(<DashboardComponent />);
  const control = shallow(<DashboardComponent/>)
  const linkElement = screen.getAllByRole("Button");
  expect(linkElement.length).toBe(control.state.length);
});