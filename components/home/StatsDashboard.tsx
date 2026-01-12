import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import {
  COLORS,
  DETAILED_CHART_DATA,
  INITIAL_CHART_DATA,
} from "../../constants";
import { HomeAppUsageItem } from "../../types";
import { AppUsageRow } from "./AppUsageRow";

interface StatsDashboardProps {
  showDetailedStats: boolean;
  appUsageData: HomeAppUsageItem[];
  onAppPress: (app: HomeAppUsageItem) => void; 
}

export const StatsDashboard = ({
  showDetailedStats,
  appUsageData,
  onAppPress,
}: StatsDashboardProps) => {
  return (
    <View className="px-5">
      <View className="items-center mb-4">
        <View
          className="w-40 h-40 rounded-full items-center justify-center"
          style={{
            backgroundColor: showDetailedStats
              ? "rgba(6, 182, 212, 0.1)"
              : "rgba(16, 185, 129, 0.1)",
            shadowColor: showDetailedStats ? "#06b6d4" : "#10b981",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 40,
          }}
        >
          <Ionicons
            name="diamond"
            size={80}
            color={showDetailedStats ? "#06b6d4" : COLORS.emerald}
          />
        </View>
      </View>

      {/* Screen Time */}
      <View className="items-center mb-2">
        <Text className="text-white text-5xl font-bold">
          {showDetailedStats ? "3h 37m" : "9m 45s"}
        </Text>
        <Text className="text-zinc-500 text-xs uppercase tracking-widest mt-1">
          Screen Time Today
        </Text>
      </View>

      {/* Stats Row */}
      <View className="flex-row justify-between items-start py-4">
        <View className="flex-1 items-center">
          <Text className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
            Most Used
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="w-6 h-6 rounded bg-zinc-800 items-center justify-center">
              <Ionicons name="logo-apple" size={14} color={COLORS.white} />
            </View>
            <View className="w-6 h-6 rounded bg-black items-center justify-center border border-zinc-700">
              <FontAwesome5 name="twitter" size={12} color={COLORS.white} />
            </View>
            {showDetailedStats ? (
              <View
                className="w-6 h-6 rounded items-center justify-center"
                style={{ backgroundColor: "#E4405F" }}
              >
                <FontAwesome5 name="instagram" size={12} color={COLORS.white} />
              </View>
            ) : (
              <View className="w-6 h-6 rounded bg-black items-center justify-center border border-zinc-700">
                <FontAwesome5 name="tiktok" size={12} color={COLORS.white} />
              </View>
            )}
          </View>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
            Focus Score
          </Text>
          <Text className="text-white text-xl font-bold">
            {showDetailedStats ? "80%" : "99%"}
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
            Pickups
          </Text>
          <Text className="text-white text-xl font-bold">
            {showDetailedStats ? "3" : "0"}
          </Text>
        </View>
      </View>

      {/* Bar Chart */}
      {showDetailedStats ? (
        // Detailed multi-color chart
        <View className="py-4">
          <View className="h-32 flex-row items-end justify-between gap-1">
            {DETAILED_CHART_DATA.map((data, index) => (
              <View key={index} className="flex-1 items-center">
                <View className="w-full flex-col-reverse">
                  {data.values.map((bar, barIndex) => (
                    <View
                      key={barIndex}
                      className="w-full rounded-sm mb-0.5"
                      style={{ height: bar.height, backgroundColor: bar.color }}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-zinc-600 text-[10px]">9AM</Text>
            <Text className="text-zinc-600 text-[10px]">1PM</Text>
            <Text className="text-zinc-600 text-[10px]">5PM</Text>
            <Text className="text-zinc-600 text-[10px]">9PM</Text>
          </View>
        </View>
      ) : (
        // Initial all-green chart
        <View className="py-4">
          <View className="h-32 flex-row items-end justify-between gap-1">
            {INITIAL_CHART_DATA.map((data, index) => (
              <View key={index} className="flex-1 items-center">
                <View
                  className="w-full rounded-t-sm"
                  style={{ height: `${data.value}%`, backgroundColor: data.color }}
                />
              </View>
            ))}
          </View>
          <View className="flex-row justify-between mt-2">
            {INITIAL_CHART_DATA.map((data, index) => (
              <Text key={index} className="text-zinc-600 text-[10px] flex-1 text-center">
                {data.hour}
              </Text>
            ))}
          </View>
        </View>
      )}

      {showDetailedStats ? (
        <View className="mt-2">
          {appUsageData.map((app, index) => (
            <AppUsageRow
              key={app.id}
              app={app}
              isLastItem={index === appUsageData.length - 1}
              onPress={onAppPress} 
            />
          ))}
          <Text className="text-zinc-600 text-xs text-center py-4 mt-2">
            Apps with less than 1m usage
          </Text>
        </View>
      ) : (
        <View className="flex-row items-center justify-between py-4 border-t border-zinc-800">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-zinc-600 mr-3" />
            <Text className="text-white text-base">Opal</Text>
          </View>
          <Text className="text-white font-medium">54m 37s</Text>
        </View>
      )}
    </View>
  );
};
