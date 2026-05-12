import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopColor: "#f1f5f9",
            borderTopWidth: 1,
            height: 90,
            paddingBottom: 30,
            paddingTop: 10,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: "#059669",
          tabBarInactiveTintColor: "#94a3b8",
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
    </>

  );
}
