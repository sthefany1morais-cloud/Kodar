// VideoPlayer.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import { VideoPlayer } from "@/components/organisms/VideoPlayer";

jest.mock("react-native-webview", () => ({
  WebView: "WebView",
}));

jest.mock("expo-screen-orientation", () => ({
  unlockAsync: jest.fn(),
  lockAsync: jest.fn(),
}));

describe("VideoPlayer", () => {
  const defaultProps = {
    videoId: "abc123",
    title: "Test Video",
    visible: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when not visible", () => {
    const { queryByTestId } = render(
      <VideoPlayer {...defaultProps} visible={false} data-testid="player" />,
    );
    expect(queryByTestId("player")).toBeNull();
  });

  it("renders title when visible", () => {
    const { getByText } = render(<VideoPlayer {...defaultProps} />);
    expect(getByText("Test Video")).toBeTruthy();
  });
});
