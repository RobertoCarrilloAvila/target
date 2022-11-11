import { render, screen } from "@testing-library/react";
import FormInput from "./FormInput";

test("formInput has a label", () => {
  render(<FormInput label="test-label" id="test-id" />);
  const label = screen.getByText("test-label");
  expect(label).toBeInTheDocument();
});

test("label for id propertie", () => {
  render(<FormInput label="test-label" id="test-id" />);
  const label = screen.getByText("test-label");
  expect(label).toHaveAttribute("for", "test-id");
});

test("formInput has an input", () => {
  render(
    <FormInput
      type="text"
      value="test-value"
      name="test-input"
      id="test-id"
      placeholder="test-placeholder"
    />);

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});


