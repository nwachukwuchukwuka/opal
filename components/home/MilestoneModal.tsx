import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface MilestoneModalProps {
  visible: boolean;
  onClose: () => void;
}

export const MilestoneModal = ({ visible, onClose }: MilestoneModalProps) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
    onRequestClose={onClose}
  >
    {/* Bottom anchored backdrop */}
    <Pressable
      onPress={onClose}
      className="flex-1 justify-end bg-slate-900/40"
    >
      {/* Main Drawer Card */}
      <Pressable
        className="bg-white w-full rounded-t-[48px] px-6 pt-8 pb-12 border-t-2 border-slate-100"
        onPress={(e) => e.stopPropagation()}
      >
        {/* Top Control Row */}
        <View className="flex-row justify-end mb-6">
          <Pressable
            className="w-12 h-12 items-center justify-center bg-slate-50 rounded-[20px] border border-slate-200"
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#64748b" />
          </Pressable>
        </View>

        {/* Immersive Visual Area */}
        <View className="items-center justify-center mb-8">
          <View className="w-48 h-48 bg-emerald-50 rounded-[40px] items-center justify-center border-[8px] border-emerald-100/50 relative overflow-hidden">
            {/* Decorative background shape */}
            <View className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-bl-full" />
            {/* <Ionicons name="diamond" size={80} color="#059669" /> */}
            <MaterialCommunityIcons name="cards-diamond" size={80} color="#059669" />
          </View>
        </View>

        {/* Text Content */}
        <View className="items-center mb-10">
          <Text className="text-slate-900 text-3xl font-extrabold mb-3 text-center">
            First gem
          </Text>
          <Text className="text-slate-500 text-base font-medium text-center leading-6 px-4">
            Reach this milestone when you complete the onboarding.
          </Text>
        </View>

        <View className="gap-4 w-full">
          <Pressable
            onPress={onClose}
            className="w-full bg-emerald-600 py-4 rounded-[24px] items-center justify-center"
          >
            <Text className="text-white text-base font-bold">
              See more milestones in your profile
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);