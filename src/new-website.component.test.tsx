import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import NewWebsiteComponent from './new-website.component';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

test('name label', () => {
  render(<NewWebsiteComponent />);
  const linkElement = screen.getByText(/Website name/i);
  expect(linkElement).toBeInTheDocument();
});

test('url label', () => {
  render(<NewWebsiteComponent />);
  const linkElement = screen.getByText(/Website address/i);
  expect(linkElement).toBeInTheDocument();
});
