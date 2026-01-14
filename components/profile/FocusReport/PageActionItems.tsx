import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const PageActionItems = ({ onClose }: { onClose: () => void }) => (
  <View className="items-center w-full">
    <Text className="text-white text-xl text-center font-normal px-4 mb-10 leading-8">
      Here are some ways you can improve your screen time in the future
    </Text>

    <View className="w-full gap-4">
      <Pressable className="bg-zinc-800 rounded-2xl p-5 flex-row items-center">
        <View className="bg-zinc-700 w-10 h-10 rounded-lg items-center justify-center mr-4">
          <Ionicons name="calendar" size={20} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-base mb-1">
            Set Up Schedule
          </Text>
          <Text className="text-zinc-500 text-xs leading-4">
            Set a schedule for when apps will be blocked automatically
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#71717a" />
      </Pressable>

      <Pressable className="bg-zinc-800 rounded-2xl p-5 flex-row items-center">
        <View className="bg-zinc-700 w-10 h-10 rounded-lg items-center justify-center mr-4">
          <Ionicons name="hourglass" size={20} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-base mb-1">
            Set Up App Limit
          </Text>
          <Text className="text-zinc-500 text-xs leading-4">
            Start blocking one or more apps when you reach a certain time limit
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#71717a" />
      </Pressable>
    </View>
  </View>
);
