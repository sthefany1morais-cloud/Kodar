import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "@/components/atoms/Button";

describe("Button", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    const { getByText } = render(<Button testID="button">Click me</Button>);
    expect(getByText("Click me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button testID="button" onPress={mockOnPress}>
        Test
      </Button>,
    );
    fireEvent.press(getByTestId("button"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
