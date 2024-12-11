import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders the button with the correct label", () => {
    // Arrange: Render the Button component with specific children
    render(<Button className="bg-red-500" onClick={() => {}}>Click Me</Button>);

    // Act & Assert: Ensure the button displays the correct label
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    // Arrange: Create a mock function for the onClick handler
    const handleClick = jest.fn();

    // Render the Button component with the mock function
    render(<Button className="bg-red-500" onClick={handleClick}>Click Me</Button>);

    // Act: Click the button
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(buttonElement);

    // Assert: Ensure the mock function was called once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has the correct styles applied", () => {
    // Arrange: Render the Button component
    render(<Button className="bg-red-500" onClick={() => {}}>Styled Button</Button>);

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
