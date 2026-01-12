import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { COLORS } from "../../constants";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.black,
          borderTopColor: COLORS.zinc800,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.zinc500,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={24} 
              color={color} 
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 10, marginTop: 2 }}>Home</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="blocks"
        options={{
          title: "Blocks",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center">
              <Ionicons 
                name={focused ? "grid" : "grid-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 10, marginTop: 2 }}>Blocks</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "person-circle" : "person-circle-outline"} 
              size={24} 
              color={color} 
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 10, marginTop: 2 }}>Profile</Text>
          ),
        }}
      />
    </Tabs>
  );
}
