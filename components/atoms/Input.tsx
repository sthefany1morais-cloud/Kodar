import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const InputContainer = styled.View<{ error?: string }>`
  background-color: #f8fafc;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ error }) => (error ? "#EF4444" : "#F1F5F9")};
  padding: 16px;
  margin-bottom: 8px;
`;

const InputField = styled.TextInput`
  color: #1e293b;
  font-size: 16px;
`;

const InputLabel = styled.Text`
  color: #64748b;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <>
    {label && <InputLabel>{label}</InputLabel>}
    <InputContainer error={error}>
      <InputField {...props} />
    </InputContainer>
    {error && <InputLabel style={{ color: "#EF4444" }}>{error}</InputLabel>}
  </>
);
