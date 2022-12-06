import { render, screen } from "@testing-library/react";
import SignUpConfirm from "./SignUpConfirm";

test("has smiles image", () => {
  render(<SignUpConfirm />);
  const image = screen.getByAltText('smiles');
  expect(image).toBeInTheDocument();
});
