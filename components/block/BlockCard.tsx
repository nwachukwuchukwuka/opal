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
        <View className="flex-row items-center justify-between w-full mb-2">
          <View className="flex-row items-center gap-2 bg-emerald-600 px-3 py-1.5 rounded-full">
            <View className="w-1.5 h-1.5 rounded-full bg-white" />
            <Text className="text-white font-bold text-xs">
              Active Session
            </Text>
          </View>

          <View className="flex-row items-center bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
            <Ionicons name="shield-checkmark" size={14} color="#059669" />
            <Text className="text-emerald-700 text-xs font-semibold ml-1.5">
              {item.blockedApps?.length} apps protected
            </Text>
          </View>
        </View>
      );
    case "upcoming":
      return (
        <View className="flex-row items-center justify-between w-full mb-2">
          <View className="flex-row items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
            <Ionicons name="alarm-outline" size={14} color="#64748b" />
            <Text className="text-slate-600 text-xs font-semibold">
              {item.countdown || "Scheduled"}
            </Text>
          </View>
        </View>
      );
    case "disabled":
      return (
        <View className="flex-row items-center justify-between w-full mb-2">
          <View className="flex-row items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <Ionicons name="pause-circle-outline" size={14} color="#475569" />
            <Text className="text-slate-700 text-xs font-semibold">
              Paused until {item.disabledUntil}
            </Text>
          </View>
        </View>
      );
    default:
      return null;
  }
};

export const BlockCard = ({ item, onPress }: BlockCardProps) => (
  <Pressable
    onPress={() => onPress(item)}
    className="bg-white rounded-[32px] p-6 border border-slate-200 relative overflow-hidden"
  >
    <View className="absolute -bottom-16 -right-12 w-48 h-48 bg-slate-50/50 rounded-full z-0 pointer-events-none" />

    <View className="z-10 w-full border-b border-slate-50 pb-3 mb-4">
      {renderStatus(item)}
    </View>

    <View className="flex-row justify-between items-end z-10">
      <View className="flex-1 pr-4">
        <Text className="text-slate-900 font-extrabold text-2xl mb-1.5">
          {item.name}
        </Text>
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="calendar-outline" size={14} color="#10b981" />
          <Text className="text-emerald-600 text-sm font-medium">
            {item.schedule}
          </Text>
        </View>
      </View>

      <View className="w-16 h-16 bg-white rounded-[20px] items-center justify-center border border-slate-200 rotate-3">
        <Text className="text-3xl">{item.icon}</Text>
      </View>
    </View>

    {item.status === "active" && (
      <View className="mt-6 z-10">
        <View className="flex-row justify-between items-center mb-2 px-1">
          <Text className="text-emerald-800 text-xs font-bold">
            Session Progress
          </Text>
          <Text className="text-emerald-800 text-xs font-bold">
            {item.progress || 0}%
          </Text>
        </View>
        <View className="h-2.5 bg-emerald-50 rounded-full overflow-hidden w-full">
          <View
            className="h-full bg-emerald-600 rounded-full"
            style={{ width: `${item.progress || 0}%` }}
          />
        </View>
      </View>
    )}
  </Pressable>
);

export default BlockCard;