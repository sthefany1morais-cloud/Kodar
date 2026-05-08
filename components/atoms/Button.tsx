import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const StyledButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ variant }) =>
    variant === "primary"
      ? "#6366F1"
      : variant === "secondary"
        ? "#10B981"
        : "transparent"};
  padding: ${({ size }) =>
    size === "lg" ? "24px" : size === "sm" ? "8px" : "16px"};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  border-width: ${({ variant }) => (variant === "outline" ? "1px" : "0px")};
  border-color: #6366f1;
  min-height: 48px;
`;

const ButtonText = styled.Text<ButtonProps>`
  color: ${({ variant }) => (variant === "outline" ? "#6366F1" : "#FFFFFF")};
  font-size: 16px;
  font-weight: 600;
`;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  ...props
}) => (
  <StyledButton variant={variant} size={size} {...props}>
    <ButtonText variant={variant}>{children}</ButtonText>
  </StyledButton>
);
