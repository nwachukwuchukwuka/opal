import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface DisabledInfoModalProps {
  visible: boolean;
  disabledUntil: string;
  onEnable: () => void;
  onDismiss: () => void;
}

export const DisabledInfoModal = ({
  visible,
  disabledUntil,
  onEnable,
  onDismiss,
}: DisabledInfoModalProps) => {
  const getDaysRemainingText = () => {
    if (disabledUntil === "Indefinitely") {
      return "You can manually turn it back on anytime.";
    }
    return "Hope you have a good time off! This session will automatically be enabled in 1 day.";
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable
        onPress={onDismiss}
        className="flex-1 justify-center items-center bg-slate-900/40"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-white rounded-[40px] w-[85%] p-8 items-center border border-slate-200 shadow-2xl"
        >
          {/* Pause Icon */}
          <View className="bg-slate-50 p-5 rounded-2xl mb-6 border border-slate-100">
            <Ionicons name="pause" size={32} color="#64748b" />
          </View>

          {/* Title */}
          <Text className="text-slate-900 text-2xl font-extrabold text-center mb-2">
            Disabled until {disabledUntil}
          </Text>

          {/* Description */}
          <Text className="text-slate-500 text-center text-base font-medium mb-8 leading-6">
            {getDaysRemainingText()}
          </Text>

          {/* Buttons */}
          <View className="w-full gap-3">
            {/* Enable Button */}
            <Pressable
              onPress={onEnable}
              className="bg-emerald-600 border border-emerald-500 rounded-[24px] py-5 items-center justify-center shadow-lg shadow-emerald-900/10"
              style={({ pressed }) => ({
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <Text className="text-white font-bold text-lg">Enable Now</Text>
            </Pressable>

            {/* Dismiss Button */}
            <Pressable
              onPress={onDismiss}
              className="bg-slate-50 border border-slate-100 rounded-[24px] py-4 items-center justify-center"
              style={({ pressed }) => ({
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <Text className="text-slate-600 font-bold text-base">
                Dismiss
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default DisabledInfoModal;
