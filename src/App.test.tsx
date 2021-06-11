import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import App from './App';

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


test('renders Log in screen', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Log in/i);
  for (let i = 0; i < linkElement.length; i++) {
    expect(linkElement[i]).toBeInTheDocument();
  }
});


test('renders Log in screen', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Register/i);
  for (let i = 0; i < linkElement.length; i++) {
    expect(linkElement[i]).toBeInTheDocument();
  }
});


test('links to register', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Register/i);
  for (let i = 0; i < linkElement.length; i++) {
    expect(linkElement[i]).toBeInTheDocument();
    if (linkElement[i].className == "btn btn-dark btn-lg btn-block") {
        linkElement[i].click();
        const register_element = screen.getAllByText(/Register/i);
        expect(register_element.length).toBe(2);
        screen.getByText(/Return/i).click();
    }
  }
});

test('empty login fails', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Log in/i);
  for (let i = 0; i < linkElement.length; i++) {
    expect(linkElement[i]).toBeInTheDocument();
    if (linkElement[i].className == "btn btn-dark btn-lg btn-block") {
        linkElement[i].click();
    }
  }
});