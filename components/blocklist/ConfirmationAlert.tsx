import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
  visible: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationAlert = ({
  visible,
  title,
  message,
  confirmText = "Yes",
  onConfirm,
  onCancel,
}: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <Pressable
      onPress={onCancel}
      className="flex-1 justify-center items-center bg-black/70"
    >
      <Pressable className="bg-zinc-800 rounded-2xl w-[85%] p-6 items-center">
        <Text className="text-white text-xl font-bold text-center">
          {title}
        </Text>
        <View className="my-3">{message}</View>
        <View className="w-full gap-3 mt-4">
          <Pressable
            onPress={onConfirm}
            className="bg-blue-600 rounded-lg py-3"
          >
            <Text className="text-white text-center font-semibold text-base">
              {confirmText}
            </Text>
          </Pressable>
          <Pressable onPress={onCancel}>
            <Text className="text-blue-500 text-center font-semibold text-base">
              Nevermind
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);
