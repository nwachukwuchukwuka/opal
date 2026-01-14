import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS, DISTRACTION_LEVELS } from "../../constants";
import { HomeAppUsageItem } from "../../types";

const AppIcon = ({ item }: { item: HomeAppUsageItem }) => {
  if (item.iconType === "text") {
    return <Text className="text-white font-bold text-sm">{item.icon}</Text>;
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

export const AppUsageRow = ({ app, isLastItem, onPress }: AppUsageRowProps) => {
  const level = DISTRACTION_LEVELS.find(
    (l) => l.value === app.distractionLevelValue
  );

  return (
    <Pressable onPress={() => onPress(app)}>
      <View
        className={`py-3 ${!isLastItem ? "border-b border-zinc-800/50" : ""}`}
      >
        <View className="flex-row items-center justify-between">
          <View
            className="w-9 h-9 rounded-xl items-center justify-center mr-3"
            style={{ backgroundColor: app.iconBgColor }}
          >
            <AppIcon item={app} />
          </View>
          <View className="flex-1">
            <Text className="text-white text-base">{app.name}</Text>
            {level && (
              <View className="flex-row items-center mt-1">
                <Text style={{ color: level.color }} className="text-xs">
                  {level.label}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={12}
                  color={level.color}
                />
              </View>
            )}
          </View>
          <Text
            className="text-base font-medium"
            style={{ color: app.timeColor || COLORS.white }}
          >
            {app.time}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
