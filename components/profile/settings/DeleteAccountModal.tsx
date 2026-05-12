import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
        className="flex-1 bg-slate-900/60 justify-center items-center px-8"
      >
        <Pressable className="bg-white w-full rounded-[44px] p-10 items-center border border-slate-100">
          <View className="w-20 h-20 bg-red-50 rounded-[32px] items-center justify-center mb-8">
            <Ionicons name="trash" size={40} color="#ef4444" />
          </View>
          
          <Text className="text-slate-900 text-3xl font-bold mb-3 text-center tracking-tight">
            Are you sure?
          </Text>
          
          <Text className="text-slate-400 text-center text-base leading-6 font-medium mb-10 px-2">
            Deleting your account is permanent and cannot be undone. All your focus history will be lost.
          </Text>

          <View className="w-full gap-4">
            <Pressable
              onPress={onClose}
              className="w-full bg-emerald-600 py-6 rounded-full items-center"
            >
              <Text className="text-white font-bold text-lg">Keep My Account</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="w-full py-4 rounded-full items-center"
            >
              <Text className="text-red-500 font-bold text-base">Delete Permanently</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}; 