import { Stack } from "expo-router";

export default function CourseLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "transparentModal",
        animation: "fade",
        contentStyle: { backgroundColor: "#fafafa" },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}
