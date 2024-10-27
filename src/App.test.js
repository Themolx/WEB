import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio', () => {
  render(<App />);
  const titleElement = screen.getByText(/Compositing/i);
  expect(titleElement).toBeInTheDocument();
});