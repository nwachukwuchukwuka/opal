import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Modal, Text, View } from "react-native";

interface SuccessModalProps {
  visible: boolean;
  onFinish: () => void;
}

export default function SuccessModal({ visible, onFinish }: SuccessModalProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onFinish();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onFinish]);

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View className="flex-1 bg-slate-900/60 items-center justify-center px-8">
        <View className="bg-white w-full p-10 rounded-[48px] items-center border border-slate-100">
          <View className="w-24 h-24 rounded-[32px] bg-emerald-50 items-center justify-center mb-8 border border-emerald-100/50">
            <Ionicons name="checkmark-circle" size={48} color="#059669" />
          </View>

          <Text className="text-slate-900 text-3xl font-bold text-center mb-3 leading-tight">
            You're all set.
          </Text>
          <Text className="text-slate-500 text-lg text-center font-medium leading-7 px-4">
            Your premium access has been activated successfully.
          </Text>
        </View>
      </View>
    </Modal>
  );
}
