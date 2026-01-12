import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants";

interface MilestoneModalProps {
  visible: boolean;
  onClose: () => void;
}

export const MilestoneModal = ({ visible, onClose }: MilestoneModalProps) => (
  <Modal
    visible={visible}
    animationType="fade"
    transparent={true}
    onRequestClose={onClose}
  >
    <View className="flex-1 bg-black items-center px-5 pt-14">
      <Pressable className="absolute top-14 left-5 z-10" onPress={onClose}>
        <Ionicons name="close" size={28} color={COLORS.white} />
      </Pressable>
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-2xl font-bold mb-2">FIRST GEM</Text>
        <Text className="text-zinc-400 text-center text-sm mb-8">
          Reach this MileStone when you complete the{"\n"}Opal onboarding.
        </Text>

        {/* Gem image/icon */}
        <View className="w-64 h-64 items-center justify-center mb-8">
          <View
            className="w-full h-full rounded-3xl items-center justify-center"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.05)",
            }}
          >
            <Ionicons name="diamond" size={140} color={COLORS.emerald} />
          </View>
        </View>

        <Pressable onPress={onClose}>
          <Text className="text-zinc-500 text-sm underline">
            See more MileStones in your profile
          </Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);
