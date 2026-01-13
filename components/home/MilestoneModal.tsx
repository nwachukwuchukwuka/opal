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
    {/* 1. Backdrop: Semi-transparent and centers the content */}
    <Pressable
      onPress={onClose}
      className="flex-1 bg-black/80 justify-center items-center px-6"
    >
      {/* 2. The Card: Dark grey background with rounded corners */}
      <Pressable 
        className="bg-[#1c1c1e] w-full rounded-[32px] p-8 items-center relative"
        onPress={(e) => e.stopPropagation()} // Prevent click-through to backdrop
      >
        
        {/* Close Button inside the card */}
        <Pressable 
            className="absolute top-4 right-4 z-10 bg-zinc-800 p-1.5 rounded-full"
            onPress={onClose}
        >
          <Ionicons name="close" size={20} color={COLORS.white} />
        </Pressable>

        {/* Content */}
        <Text className="text-white text-2xl font-bold mb-2 text-center">FIRST GEM</Text>
        
        <Text className="text-zinc-400 text-center text-sm mb-8 leading-5">
          Reach this MileStone when you complete the{"\n"}Opal onboarding.
        </Text>

        {/* Gem image/icon */}
        <View className="w-48 h-48 items-center justify-center mb-8">
          <View
            className="w-full h-full rounded-3xl items-center justify-center"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.05)",
            }}
          >
            <Ionicons name="diamond" size={100} color={COLORS.emerald} />
          </View>
        </View>

        <Pressable onPress={onClose}>
          <Text className="text-zinc-500 text-sm underline">
            See more MileStones in your profile
          </Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);