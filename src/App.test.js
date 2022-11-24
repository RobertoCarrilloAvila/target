import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login", () => {
  render(<App />);
  const linkElement = screen.getByText("Target MVD");
  expect(linkElement).toBeInTheDocument();
});
