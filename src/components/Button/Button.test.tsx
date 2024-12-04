
import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders the button with the correct label", () => {
    // Arrange: Render the Button component with a specific label
    render(<Button label="Click Me" onClick={() => {}} />);

    // Act & Assert: Ensure the button displays the correct label
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    // Arrange: Create a mock function for the onClick handler
    const handleClick = jest.fn();

    // Render the Button component with the mock function
    render(<Button label="Click Me" onClick={handleClick} />);

    // Act: Click the button
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(buttonElement);

    // Assert: Ensure the mock function was called once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has the correct styles applied", () => {
    // Arrange: Render the Button component
    render(<Button label="Styled Button" onClick={() => {}} />);

    // Act: Get the button element
    const buttonElement = screen.getByRole("button", { name: "Styled Button" });

    // Assert: Ensure the button has the expected Tailwind classes
    expect(buttonElement).toHaveClass(
      "px-4",
      "py-2",
      "bg-blue-500",
      "text-white",
      "rounded",
      "hover:bg-blue-600"
    );
  });
});
