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
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 px-8">
            {/* Minimalist Top Nav */}
            <View className="flex-row justify-start items-center pt-4 mb-10">
              <Pressable
                onPress={onClose}
                className="w-11 h-11 bg-slate-50 rounded-full items-center justify-center border border-slate-100"
              >
                <Ionicons name="close" size={24} color="#059669" />
              </Pressable>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1  pb-20"
            >
              <View className="mb-12">
                <Text className="text-slate-900 text-4xl font-bold mb-3 tracking-tight">
                  Change Gem Name
                </Text>
                <Text className="text-slate-400 text-lg leading-6 font-medium">
                  Choose a name that reflects your identity within the Opal community.
                </Text>
              </View>

              <View className="bg-slate-50 rounded-3xl border border-slate-100 px-6 py-6 mb-12">
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">New Identity</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  autoFocus
                  className="text-slate-900 text-2xl font-semibold"
                  placeholder="Enter name"
                  placeholderTextColor="#cbd5e1"
                />
              </View>

              <Pressable
                onPress={handleSave}
                className="w-full bg-emerald-600 py-6 rounded-full items-center"
              >
                <Text className="text-white font-bold text-lg">Save Changes</Text>
              </Pressable>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
