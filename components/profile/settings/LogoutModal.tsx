import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({
  visible,
  onClose,
  onConfirm,
}: LogoutModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 bg-slate-900/60 justify-center items-center px-8"
      >
        <Pressable className="bg-white w-full rounded-[44px] p-10 items-center border border-slate-100">
          <View className="w-20 h-20 bg-slate-50 rounded-[32px] items-center justify-center mb-8">
            <Ionicons name="log-out" size={40} color="#059669" />
          </View>

          <Text className="text-slate-900 text-3xl font-bold mb-3 text-center tracking-tight">
            Logging Out?
          </Text>

          <Text className="text-slate-400 text-center text-base leading-6 font-medium mb-10 px-2">
            You may lose access to your active focus sessions and local data stored on this device.
          </Text>

          <View className="w-full gap-4">
            <Pressable
              onPress={onConfirm}
              className="w-full bg-slate-950 py-6 rounded-full items-center"
            >
              <Text className="text-white font-bold text-lg">Sign Out</Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              className="w-full py-2 rounded-full items-center"
            >
              <Text className="text-slate-400 font-bold text-base">Stay Logged In</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
