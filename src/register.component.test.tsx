import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import App from './login.component';
import { Button } from '@material-ui/core';
import RegisterComponent from './register.component';

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
  render(<RegisterComponent />);
  const linkElement = screen.getAllByText(/Register/i);
  for (let i = 0; i < linkElement.length; i++) {
    expect(linkElement[i]).toBeInTheDocument();
  }
});

test('renders username label', () => {
  render(<RegisterComponent />);
  const linkElement = screen.getByText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders password confirmation label', () => {
    render(<RegisterComponent />);
    const linkElement = screen.getByText(/Confirm password/i);
    expect(linkElement).toBeInTheDocument();
  });

test('renders link', () => {
    render(<RegisterComponent/>);
    const button = screen.getAllByRole(/button/i);
    for (let i = 0; i < button.length; i++) {
        expect(button[i]).toBeInTheDocument();
      }
}) 