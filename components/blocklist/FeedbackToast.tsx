import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Modal, Text, View } from "react-native";

interface Props {
  visible: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onHide: () => void;
}

export const FeedbackToast = ({ visible, icon, text, onHide }: Props) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onHide(), 1500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center" pointerEvents="none">
        <View className="bg-black/80 rounded-2xl p-6 items-center gap-3">
          <Ionicons name={icon} size={48} color="white" />
          <Text className="text-white font-semibold">{text}</Text>
        </View>
      </View>
    </Modal>
  );
};
