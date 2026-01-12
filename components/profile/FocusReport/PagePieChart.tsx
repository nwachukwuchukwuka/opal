import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const PagePieChart = () => (
  <View className="items-center">
    <View className="mb-10 items-center">
      <Ionicons
        name="phone-portrait-outline"
        size={40}
        color="#71717a"
        style={{ marginBottom: 20 }}
      />
      <Text className="text-white text-md font-normal text-center ">
        You're on track to spend an average of{" "}
        <Text className="font-bold text-green-400">5h 15m</Text> per day on your
        phone this week.
      </Text>
    </View>

    {/* Custom CSS Pie Chart Sim */}
    <View className="w-48 h-48 rounded-full border-[16px] border-zinc-800 relative items-center justify-center mb-10">
      <View className="absolute w-48 h-48 rounded-full border-[16px] border-red-500 border-l-transparent border-b-transparent border-r-transparent rotate-45" />
      <Text className="text-white font-bold text-xl">16h</Text>
    </View>

    <Text className="text-white text-xl text-center mb-16">
      That's about <Text className="font-bold text-green-400">33%</Text> of your
      waking hours.
    </Text>

    <View className="bg-zinc-900 w-full p-3 rounded-2xl border border-zinc-800">
      <Text className="text-zinc-500 text-sm tracking-widest text-center mb-1">
        Did you know
      </Text>
      <Text className="text-white text-center text-sm">
        People similar to you spent <Text className="text-green-400">27%</Text>{" "}
        less time on their phones last week.
      </Text>
    </View>
  </View>
);
