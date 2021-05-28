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
