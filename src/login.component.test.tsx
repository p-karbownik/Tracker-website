import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import App from './login.component';
import { Button } from '@material-ui/core';
import LoginComponent from './login.component';

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

test('renders Register button', () => {
  render(<LoginComponent />);
  const linkElement = screen.getByText(/Register/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders username label', () => {
  render(<LoginComponent />);
  const linkElement = screen.getByText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Log in button', () => {
  render(<LoginComponent />);
  const linkElement = screen.getAllByText(/Log in/i);
  for (let i = 0; i < linkElement.length; i++) {
    expect(linkElement[i]).toBeInTheDocument();
  }
});
