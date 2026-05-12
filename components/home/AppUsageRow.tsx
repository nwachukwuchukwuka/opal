import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS, DISTRACTION_LEVELS } from "../../constants";
import { HomeAppUsageItem } from "../../types";

const AppIcon = ({ item }: { item: HomeAppUsageItem }) => {
  if (item.iconType === "text") {
    return <Text className="text-slate-900 font-bold text-sm">{item.icon}</Text>;
  }
  if (item.iconType === "fontawesome") {
    return <FontAwesome5 name={item.icon} size={16} color={item.iconColor} />;
  }
  return <Ionicons name={item.icon as any} size={18} color={item.iconColor} />;
};

interface AppUsageRowProps {
  app: HomeAppUsageItem;
  isLastItem: boolean;
  onPress: (app: HomeAppUsageItem) => void;
}

export const AppUsageRow = ({ app, onPress }: AppUsageRowProps) => {
  const level = DISTRACTION_LEVELS.find(
    (l) => l.value === app.distractionLevelValue
  );

  return (
    <Pressable 
      onPress={() => onPress(app)}
      className="w-[48%] bg-white rounded-[24px] p-4 border border-slate-100 mb-4"
    >
      <View className="flex-row justify-between items-start mb-4">
        <View
          className="w-10 h-10 rounded-2xl items-center justify-center border border-slate-50"
          style={{ backgroundColor: app.iconBgColor }}
        >
          <AppIcon item={app} />
        </View>
        <Text className="text-slate-900 font-bold text-sm">{app.time}</Text>
      </View>
      
      <View>
        <Text className="text-slate-900 font-bold text-sm mb-1" numberOfLines={1}>{app.name}</Text>
        {level && (
          <View className="flex-row items-center">
             <View className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: level.color }} />
             <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{level.label}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};
