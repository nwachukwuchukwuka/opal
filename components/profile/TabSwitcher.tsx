import React from "react";
import { Pressable, Text, View } from "react-native";

interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  size?: 'small' | 'medium';
}

export const TabSwitcher = ({ tabs, activeTab, onTabChange, size = 'small' }: TabSwitcherProps) => (
  <View className="flex-row bg-rose-50/50 p-1.5 rounded-full border border-rose-100 mb-6">
    {tabs.map((tab) => (
      <Pressable
        key={tab}
        onPress={() => onTabChange(tab)}
        className={`flex-1 py-3 rounded-full items-center justify-center ${activeTab === tab ? "bg-white" : ""
          }`}
      >
        <Text
          className={`font-semibold ${activeTab === tab ? "text-rose-950" : "text-rose-300"
            } ${size === 'small' ? 'text-xs' : 'text-sm'}`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Text>
      </Pressable>
    ))}
  </View>
);