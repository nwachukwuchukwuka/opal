import React from "react";
import { Pressable, Text, View } from "react-native";

interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  size?: 'small' | 'medium';
}

export const TabSwitcher = ({ tabs, activeTab, onTabChange, size = 'small' }: TabSwitcherProps) => (
  <View className="flex-row mb-4">
    {tabs.map((tab) => (
      <Pressable
        key={tab}
        onPress={() => onTabChange(tab)}
        className={`px-5 py-2 rounded-full mr-2 ${
          activeTab === tab ? "bg-white" : "bg-zinc-800"
        }`}
      >
        <Text
          className={`font-semibold ${
            activeTab === tab ? "text-black" : "text-zinc-400"
          } ${size === 'small' ? 'text-xs' : 'text-sm'}`}
        >
          {tab}
        </Text>
      </Pressable>
    ))}
  </View>
);