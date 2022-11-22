import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

test("has className", () => {
  render(<Navbar className="blue" />);
  const navbar = screen.getByRole("navigation");
  expect(navbar).toHaveClass("blue");
});

test("has 2 images for mobile", () => {
  render(<Navbar className="blue" />);
  const images = screen.getAllByRole("img");
  expect(images).toHaveLength(2);
});
