import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmailVerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onSendEmail: () => void;
  onEditEmail: () => void;
}

export const EmailVerificationModal = ({
  visible,
  onClose,
  onSendEmail,
  onEditEmail,
}: EmailVerificationModalProps) => {
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
          <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-8">
            <Ionicons name="mail-unread" size={40} color="#059669" />
          </View>

          <Text className="text-slate-900 text-3xl font-bold mb-3 text-center tracking-tight">
            Verify Email
          </Text>
          
          <Text className="text-slate-400 text-center text-base leading-6 font-medium mb-10 px-2">
            Your email address hasn't been verified yet. We need this to ensure your account is secure.
          </Text>

          <View className="w-full gap-4">
            <Pressable
              onPress={onSendEmail}
              className="w-full bg-emerald-600 py-6 rounded-full items-center"
            >
              <Text className="text-white font-bold text-lg">Send Verification</Text>
            </Pressable>

            <Pressable
              onPress={onEditEmail}
              className="w-full bg-slate-50 py-4 rounded-full items-center border border-slate-100"
            >
              <Text className="text-slate-600 font-bold text-base">Edit Email</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};