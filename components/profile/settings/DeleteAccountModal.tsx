import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteAccountModal = ({
  visible,
  onClose,
  onConfirm,
}: DeleteAccountModalProps) => {
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
        <Pressable className="bg-[#1c1c1e] w-full rounded-[32px] p-6 items-center">
          <Text className="text-white text-3xl font-bold mb-4 text-center">
            Are you sure?
          </Text>
          
          <Text className="text-zinc-400 text-center text-base leading-6 mb-8">
            Are you sure you want to delete your account? This action cannot be undone.
          </Text>

          <View className="w-full gap-3">
            <Pressable
              onPress={onClose}
              className="w-full bg-[#007AFF] py-4 rounded-full items-center"
            >
              <Text className="text-white font-bold text-lg">Nevermind</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="w-full py-3 rounded-full items-center"
            >
              <Text className="text-white font-bold text-base">DELETE PERMANENTLY</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}; 