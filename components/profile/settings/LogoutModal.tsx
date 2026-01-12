import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

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
        className="flex-1 bg-black/80 justify-center items-center px-6"
      >
        <Pressable className="bg-[#1c1c1e] w-full rounded-[32px] p-8 items-center">
          <Text className="text-white text-2xl font-bold mb-4 text-center">
            Are you sure you{"\n"}want to log out?
          </Text>

          <Text className="text-zinc-400 text-center text-sm leading-5 mb-8 px-2">
            You may lose access to your subscription and some data that is
            stored locally on your device
          </Text>

          <View className="w-full gap-3">
            <Pressable
              onPress={onConfirm}
              className="w-full bg-[#007AFF] py-4 rounded-full items-center"
            >
              <Text className="text-white font-bold text-lg">Yes</Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              className="w-full py-2 rounded-full items-center"
            >
              <Text className="text-white font-bold text-lg">Cancel</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
