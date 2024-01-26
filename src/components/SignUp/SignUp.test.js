import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";

test("has name input", () => {
  render(<SignUp />, { wrapper: MemoryRouter });
  const input = screen.getByLabelText("name");
  expect(input).toBeInTheDocument();
});

test("has email input", () => {
  render(<SignUp />, { wrapper: MemoryRouter });
  const input = screen.getByLabelText("email");
  expect(input).toBeInTheDocument();
});

test("has password input", () => {
  render(<SignUp />, { wrapper: MemoryRouter });
  const input = screen.getByLabelText("password");
  expect(input).toBeInTheDocument();
});

test("has password confirmation input", () => {
  render(<SignUp />, { wrapper: MemoryRouter });
  const input = screen.getByLabelText("confirm password");
  expect(input).toBeInTheDocument();
});

test("has gender select", () => {
  render(<SignUp />, { wrapper: MemoryRouter });
  const select = screen.getByLabelText("gender");
  expect(select).toBeInTheDocument();
});
