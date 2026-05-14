import React from "react";
import { render } from "@testing-library/react-native";
import { NotificationSettings } from "@/components/organisms/NotificationSettings";

jest.mock("@/context/NotificationContext", () => ({
  useNotifications: () => ({
    requestPermissions: jest.fn(),
    sendTestNotification: jest.fn(),
    getToken: jest.fn(),
  }),
}));

describe("NotificationSettings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders notification settings correctly", () => {
    const { getByText } = render(<NotificationSettings />);
    expect(getByText("Notificações Push")).toBeTruthy();
  });
});
