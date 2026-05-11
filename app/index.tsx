import React from "react";
import { View, ScrollView } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";
import { Button } from "../components/atoms/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import IndexScreen from "../screens/home/IndexScreen";

export default function Index() {
  return <IndexScreen />;
}
