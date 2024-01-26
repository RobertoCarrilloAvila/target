import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUpConfirm from "./SignUpConfirm";

test("has smiles image", () => {
  render(<SignUpConfirm />, { wrapper: MemoryRouter });
  const image = screen.getByAltText("smiles");
  expect(image).toBeInTheDocument();
});
