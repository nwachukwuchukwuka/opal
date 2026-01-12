import React from "react";
import { Pressable, Text, View } from "react-native";

export const JoinBoardCard = () => (
    <View className="bg-zinc-900 rounded-3xl p-5 mb-6">
        <View className="bg-green-100 self-start px-2 py-0.5 rounded-md mb-3">
            <Text className="text-black text-[10px] font-bold">NEW</Text>
        </View>
        <Text className="text-white text-lg font-bold mb-2">Join Community Board</Text>
        <Text className="text-zinc-400 text-sm mb-6 leading-5">
            Chat and read the latest Opal news, ask for new features, learn from each other and share about Focus, screen time and digital wellbeing.
        </Text>
        <Pressable className="bg-white rounded-full py-4 items-center">
            <Text className="text-black font-bold text-base">Discover Board</Text>
        </Pressable>
    </View>
);