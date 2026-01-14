import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { BlockItem } from "../../constants/appData";

interface BlockCardProps {
  item: BlockItem;
  onPress: (item: BlockItem) => void;
}

const renderStatus = (item: BlockItem) => {
  switch (item.status) {
    case "active":
      return (
        <View>
          <View className="flex-row items-center gap-2 mt-2">
            <View className="w-2 h-2 rounded-full bg-teal-400" />
            <Text className="text-teal-400 font-semibold text-sm">
              Blocking
            </Text>
            <Text className="text-zinc-400">•</Text>
            <View className="flex-row items-center">
              <View className="w-5 h-5 rounded bg-orange-400 -ml-1" />
              <View className="w-5 h-5 rounded bg-blue-500 -ml-2" />
              <Text className="text-zinc-400 text-xs ml-1.5">
                +{item.blockedApps?.length}
              </Text>
            </View>
          </View>
        </View>
      );
    case "upcoming":
      return (
        <View className="flex-row items-center gap-2 mt-2 bg-zinc-700 self-start px-2 py-1 rounded-md">
          <Ionicons name="time-outline" size={14} color="#a1a1aa" />
          <Text className="text-zinc-400 text-xs font-semibold">
            {item.countdown || "Scheduled"}
          </Text>
        </View>
      );
    case "disabled":
      return (
        <View className="flex-row items-center gap-2 mt-2 bg-zinc-700 self-start px-2 py-1 rounded-md">
          <Ionicons name="pause" size={12} color="#a1a1aa" />
          <Text className="text-zinc-400 text-xs font-semibold">
            Disabled until {item.disabledUntil}
          </Text>
        </View>
      );
    default:
      return null;
  }
};

export const BlockCard = ({ item, onPress }: BlockCardProps) => (
  <Pressable
    onPress={() => onPress(item)}
    className="bg-zinc-900 rounded-2xl overflow-hidden"
  >
    <View className="p-4 flex-row justify-between items-center">
      <View className="flex-row gap-4 items-center flex-1">
        <Text className="text-3xl">{item.icon}</Text>
        <View className="flex-1">
          <Text className="text-white font-semibold text-lg">{item.name}</Text>
          <Text className="text-zinc-400 text-xs">{item.schedule}</Text>
          {renderStatus(item)}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#71717a" />
    </View>

    {item.status === "active" && (
      <View className="h-1 bg-zinc-800 w-full">
        <View
          className="h-full bg-teal-400"
          style={{ width: `${item.progress || 0}%` }}
        />
      </View>
    )}
  </Pressable>
);

export default BlockCard;
