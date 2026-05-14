// Loading.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import { Loading } from "@/components/atoms/Loading";

describe("Loading", () => {
  it("renders ActivityIndicator", () => {
    const { getByTestId } = render(<Loading data-testid="loading" />);
    expect(getByTestId("loading")).toBeTruthy();
  });
});
