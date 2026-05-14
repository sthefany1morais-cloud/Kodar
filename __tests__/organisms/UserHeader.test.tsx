import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { UserHeader } from "@/components/organisms/UserHeader";
import { User } from "@/types";

const mockUser: User = {
  uid: "user123",
  email: "joao@email.com",
  displayName: "João Silva",
  photoURL: null,
  purchasedCourses: [],
};

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ logout: jest.fn() }),
}));

jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: { replace: jest.fn() },
}));

describe("UserHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user info correctly", () => {
    const { getByText } = render(<UserHeader user={mockUser} />);
    expect(getByText("Olá, João")).toBeTruthy();
    expect(getByText("Sair")).toBeTruthy();
  });
});
