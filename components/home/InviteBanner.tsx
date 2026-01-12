import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants";

interface InviteBannerProps {
  onClose: () => void;
}

export const InviteBanner = ({ onClose }: InviteBannerProps) => (
  <View className="mx-5 mb-6 bg-white rounded-2xl p-4 flex-row items-start">
    <Ionicons
      name="gift"
      size={20}
      color={COLORS.black}
      style={{ marginRight: 12, marginTop: 2 }}
    />
    <View className="flex-1">
      <Text className="text-black font-semibold text-base mb-1">Invite Friends</Text>
      <Text className="text-zinc-600 text-sm leading-5">
        Give your friends 30 days free of Opal{"\n"}and unlock rewards.
      </Text>
    </View>
    <Pressable onPress={onClose} className="p-1">
      <Ionicons name="close" size={20} color={COLORS.zinc400} />
    </Pressable>
  </View>
);