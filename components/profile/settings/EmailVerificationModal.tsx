import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

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
      {/* Backdrop */}
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/80 justify-center items-center"
      >
        {/* Modal Content */}
        <Pressable className="bg-zinc-900 w-[85%] rounded-[32px] p-6 items-center">
          <Text className="text-white text-3xl font-bold mb-4 text-center">
            Not Verified
          </Text>
          
          <Text className="text-zinc-400 text-center text-base leading-6 mb-8 px-2">
            Your email address is not yet verified. Would you like to re-send the
            verification email?
          </Text>

          {/* Buttons */}
          <View className="w-full gap-3">
            <Pressable
              onPress={onSendEmail}
              className="w-full bg-[#007AFF] py-4 rounded-full items-center"
            >
              <Text className="text-white font-bold text-lg">Send email</Text>
            </Pressable>

            <Pressable
              onPress={onEditEmail}
              className="w-full bg-zinc-800 py-4 rounded-full items-center"
            >
              <Text className="text-white font-bold text-lg">Edit email</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};