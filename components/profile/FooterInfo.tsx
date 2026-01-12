import React from "react";
import { Text, View } from "react-native";

export const FooterInfo = () => (
    <View className="bg-zinc-900 rounded-3xl p-5 mb-10">
        <Text className="text-white text-base font-bold mb-4">Opal gem since 2 September 2024</Text>
        <View className="flex-row divide-x divide-zinc-800">
            <View className="flex-1 items-center gap-1">
                <Text className="text-zinc-400 text-xs">Sessions</Text>
                <Text className="text-white text-lg font-bold">25</Text>
            </View>
            <View className="flex-1 items-center gap-1">
                <Text className="text-zinc-400 text-xs">Session Time</Text>
                <Text className="text-white text-lg font-bold">21h 43m</Text>
            </View>
            <View className="flex-1 items-center gap-1">
                <Text className="text-zinc-400 text-xs">Snooze Time</Text>
                <Text className="text-white text-lg font-bold">0m</Text>
            </View>
        </View>
    </View>
);