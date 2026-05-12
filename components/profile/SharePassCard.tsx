import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface SharePassCardProps {
  onPress: () => void;
}

export const SharePassCard = ({ onPress }: SharePassCardProps) => (
  <View className="bg-white border border-slate-200 rounded-[44px] p-6 mb-2 overflow-hidden">
    <View className="flex-row items-center justify-between">
      {/* Left Info Panel */}
      <View className="flex-1 pr-4">
        <View className="bg-emerald-50 self-start px-3 py-1 rounded-full border border-emerald-100 mb-3">
          <Text className="text-emerald-700 text-[10px] font-bold">Free Rewards</Text>
        </View>
        <Text className="text-slate-900 text-2xl font-semibold mb-2">Share Pass</Text>
        <Text className="text-slate-400 text-sm leading-5 mb-6">
          Get premium rewards by inviting your friends to join opal.
        </Text>
        <Pressable
          onPress={onPress}
          className="bg-emerald-600 rounded-full py-4 px-6 items-center self-start"
        >
          <Text className="text-white font-bold text-sm">Claim Rewards</Text>
        </Pressable>
      </View>

      {/* Right Hero Badge */}
      <View className="w-32 h-44 bg-slate-50 rounded-[32px] items-center justify-center border border-slate-200 overflow-hidden">
        <LinearGradient
          colors={["#10b981", "#059669", "#064e3b"]}
          style={{
            position: "absolute",
            width: "120%",
            height: "120%",
            transform: [{ rotate: "15deg" }],
          }}
        />
        <View className="bg-white/20 p-4 rounded-full border border-white/30">
          <Ionicons name="gift" size={40} color="white" />
        </View>
        <View className="mt-4 bg-white/10 px-3 py-1 rounded-full border border-white/20">
          <Text className="text-white text-[10px] font-bold">1/5 Referrals</Text>
        </View>
      </View>
    </View>
  </View>
);
