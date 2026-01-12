import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface EditGemNameModalProps {
  visible: boolean;
  initialName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
}

export const EditGemNameModal = ({
  visible,
  initialName,
  onClose,
  onSave,
}: EditGemNameModalProps) => {
  const [name, setName] = useState(initialName);

  const handleSave = () => {
    onSave(name);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-black">
          {/* Header */}
          <View className="px-4 pt-2">
            <Pressable
              onPress={onClose}
              className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
            >
              <Ionicons name="close" size={24} color="white" />
            </Pressable>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-between px-6 pb-6"
          >
            <View className="mt-10">
              <Text className="text-white text-3xl font-bold text-center mb-2">
                Change Gem Name
              </Text>
              <Text className="text-zinc-500 text-center mb-10">
                Enter your new gem name
              </Text>

              <TextInput
                value={name}
                onChangeText={setName}
                autoFocus
                className="w-full bg-zinc-900 text-white text-lg px-4 py-4 rounded-xl border border-zinc-800"
                placeholder="Gem Name"
                placeholderTextColor="#52525b"
              />
            </View>

            <Pressable
              onPress={handleSave}
              className="w-full bg-white py-4 rounded-full items-center"
            >
              <Text className="text-black font-bold text-lg">Continue</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
