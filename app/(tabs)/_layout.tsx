import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6366F1",
        tabBarStyle: {
          backgroundColor: "#fafafa",
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Cursos",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-courses"
        options={{
          title: "Meus Cursos",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="graduation-cap" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
