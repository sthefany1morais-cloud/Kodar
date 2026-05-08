import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Spinner = styled.ActivityIndicator`
  color: #6366f1;
`;

export const Loading: React.FC = () => <Spinner size="large" />;
