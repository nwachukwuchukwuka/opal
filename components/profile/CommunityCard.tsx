import React from "react";
import { Text, View } from "react-native";

export const CommunityCard = () => (
  <View className="bg-zinc-900 rounded-3xl p-5 mb-6">
    <Text className="text-white text-lg font-bold mb-2">Community</Text>
    <Text className="text-zinc-400 text-sm mb-6 leading-5">
      Your Screen Time was <Text className="text-red-400">23% higher</Text> than your peers yesterday. Opal can help to keep you on track!
    </Text>

    <View className="mb-8">
        <View className="flex-row justify-between items-end h-8 mb-2 px-1">
            {Array.from({ length: 45 }).map((_, i) => (
                <View 
                    key={i} 
                    className={`w-[2px] rounded-full ${i % 5 === 0 ? 'h-4 bg-zinc-500' : 'h-2 bg-zinc-700'}`} 
                />
            ))}
        </View>
        
        <View className="relative h-10 w-full">
            <View className="absolute left-[40%] items-center">
                <View className="h-3 w-[2px] bg-white mb-1" />
                <Text className="text-white text-[10px] font-bold">4h 17m</Text>
                <Text className="text-zinc-500 text-[8px]">25-34 Average</Text>
            </View>

            <View className="absolute left-[65%] items-center -top-6">
                <View className="w-6 h-6 rounded-full border-2 border-white items-center justify-center bg-black mb-1">
                    <View className="w-4 h-4 rounded-full border-2 border-teal-400" />
                </View>
                <View className="h-3 w-[2px] bg-red-400 mb-1" />
                <Text className="text-red-400 text-[10px] font-bold">5h 15m</Text>
                <Text className="text-zinc-500 text-[8px]">You</Text>
            </View>
        </View>
    </View>
  </View>
);