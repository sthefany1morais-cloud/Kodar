import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Input } from "@/components/atoms/Input";

describe("Input", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly without label", () => {
    const { getByDisplayValue } = render(<Input testID="input" value="test" />);
    expect(getByDisplayValue("test")).toBeTruthy();
  });

  it("renders label when provided", () => {
    const { getByText } = render(
      <Input label="Test Label" value="" testID="input" />,
    );
    expect(getByText("Test Label")).toBeTruthy();
  });

  it("handles onChangeText correctly", () => {
    const mockOnChange = jest.fn();
    const { getByDisplayValue } = render(
      <Input value="initial" onChangeText={mockOnChange} testID="input" />,
    );
    const input = getByDisplayValue("initial");
    fireEvent.changeText(input, "new value");
    expect(mockOnChange).toHaveBeenCalledWith("new value");
  });
});
