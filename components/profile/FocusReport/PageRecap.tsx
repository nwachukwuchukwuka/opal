import React from "react";
import { Text, View } from "react-native";

export const PageRecap = () => (
  <View className="items-center w-full">
    <Text className="text-white text-2xl font-bold mb-2">Let's recap</Text>
    <Text className="text-zinc-400 text-sm mb-12">Here are some highlights from your report</Text>

    <View className="w-full gap-6">
        {/* Item 1 */}
        <View className="flex-row justify-between items-center py-4 border-b border-zinc-800">
            <View>
                <Text className="text-white text-3xl font-bold mb-1">5h 15m</Text>
                <Text className="text-zinc-500 text-xs">Avg Daily Screen Time</Text>
            </View>
            <View className="bg-yellow-600/20 px-2 py-1 rounded border border-yellow-600/50">
                <Text className="text-yellow-500 font-bold text-xs">OK</Text>
            </View>
        </View>

        {/* Item 2 */}
        <View className="flex-row justify-between items-center py-4 border-b border-zinc-800">
            <View>
                <Text className="text-white text-3xl font-bold mb-1">-15m</Text>
                <Text className="text-zinc-500 text-xs">Avg Time Saved Per Day</Text>
            </View>
            <View className="bg-yellow-600/20 px-2 py-1 rounded border border-yellow-600/50">
                <Text className="text-yellow-500 font-bold text-xs">▲ 5.2%</Text>
            </View>
        </View>

        {/* Item 3 */}
        <View className="flex-row justify-between items-center py-4">
            <View>
                <Text className="text-white text-3xl font-bold mb-1">3 YEARS</Text>
                <Text className="text-zinc-500 text-xs">Potential Lifetime Savings</Text>
            </View>
        </View>
    </View>
  </View>
);