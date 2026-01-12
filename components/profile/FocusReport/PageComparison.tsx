import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const PageComparison = () => (
  <View className="items-center w-full">
    <Ionicons
      name="alert-circle-outline"
      size={48}
      color="#ef4444"
      style={{ marginBottom: 30 }}
    />

    <Text className="text-white text-md text-center mb-10">
      Your Screen Time is <Text className="text-red-500 font-bold">5.2%</Text>{" "}
      higher than you declared.
    </Text>

    <View className="w-full gap-4 mb-10">
      <View>
        <Text className="text-white font-bold text-lg mb-1">5h 15m</Text>
        <View className="bg-red-500 rounded-lg p-3 w-full">
          <Text className="text-white font-bold">This Week</Text>
        </View>
      </View>
      <View className="border-t border-zinc-800 border-dashed my-2" />
      <View>
        <Text className="text-white font-bold text-lg mb-1">5h</Text>
        <View className="bg-zinc-800 rounded-lg p-3 w-[95%]">
          <Text className="text-zinc-400">Declared during setup</Text>
        </View>
      </View>
    </View>

    <Text className="text-white text-center text-md mb-8 px-4">
      <Text className="text-red-500 font-bold">15m</Text> adds up quickly and
      can have a big impact...
    </Text>

    <View className="flex-row items-center mb-12">
      <Ionicons name="pencil" size={14} color="#a1a1aa" />
      <Text className="text-zinc-400 ml-2 text-sm underline">
        Edit Initial Screen Time
      </Text>
    </View>

    <View className="bg-zinc-900 w-full p-3 rounded-2xl border border-zinc-800">
      <Text className="text-zinc-500 text-sm uppercase tracking-widest text-center mb-1">
        Did you know
      </Text>
      <Text className="text-white text-center text-sm">
        Opal members saved a total of{" "}
        <Text className="text-green-400">19 years</Text> focusing yesterday, and
        that includes you!
      </Text>
    </View>
  </View>
);
