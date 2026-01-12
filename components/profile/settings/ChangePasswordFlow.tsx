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

interface ChangePasswordFlowProps {
  visible: boolean;
  onClose: () => void;
  email: string; // Pre-filled email
}

export const ChangePasswordFlow = ({
  visible,
  onClose,
  email,
}: ChangePasswordFlowProps) => {
  const [step, setStep] = useState<"verify" | "newPassword">("verify");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSignIn = () => {
    // In a real app, verify credentials here
    if (currentPassword.length > 0) {
      setStep("newPassword");
    }
  };

  const handleSaveNewPassword = () => {
    // Save logic here
    console.log("New password saved:", newPassword);
    onClose();
    // Reset state after close
    setTimeout(() => {
      setStep("verify");
      setCurrentPassword("");
      setNewPassword("");
    }, 500);
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
          <View className="px-4 pt-2 flex-row justify-between items-center">
            {step === "newPassword" ? (
              <Pressable
                onPress={onClose}
                className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
            ) : (
              <View /> // Empty view to keep spacing if needed, or back button
            )}

            {step === "verify" && (
              <Pressable onPress={onClose}>
                <Text className="text-zinc-400 text-base">Cancel</Text>
              </Pressable>
            )}
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-between px-6 pb-6"
          >
            {step === "verify" ? (
              /* --- STEP 1: CONFIRM DETAILS --- */
              <View className="mt-10 items-center w-full">
                <Text className="text-white text-4xl font-bold mb-4">Opal</Text>

                <Text className="text-white text-2xl font-bold text-center mb-2">
                  Confirm your details to{"\n"}change your Password
                </Text>

                <Text className="text-zinc-400 text-center mb-8">
                  You need to confirm who you are to perform{"\n"}this action
                </Text>

                <View className="w-full gap-4">
                  <TextInput
                    value={email}
                    editable={false} // Email is usually fixed here
                    className="w-full bg-black text-zinc-500 text-lg px-4 py-4 rounded-xl border border-zinc-700"
                  />
                  <TextInput
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="Your Password"
                    placeholderTextColor="#52525b"
                    secureTextEntry
                    autoFocus
                    className="w-full bg-black text-white text-lg px-4 py-4 rounded-xl border border-zinc-700"
                  />
                </View>

                <Pressable className="mt-6">
                  <Text className="text-zinc-500">Forgot password?</Text>
                </Pressable>
              </View>
            ) : (
              /* --- STEP 2: NEW PASSWORD --- */
              <View className="mt-10 items-center w-full">
                <Text className="text-white text-2xl font-bold text-center mb-2">
                  Change Password
                </Text>
                <Text className="text-zinc-500 text-center mb-10">
                  Enter a new password
                </Text>

                <View className="w-full relative">
                  <Ionicons
                    name="lock-closed"
                    size={16}
                    color="#f59e0b" // Gold lock icon color
                    style={{
                      position: "absolute",
                      left: 16,
                      top: 18,
                      zIndex: 10,
                    }}
                  />
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Password"
                    placeholderTextColor="#52525b"
                    secureTextEntry
                    autoFocus
                    className="w-full bg-zinc-900 text-white text-lg pl-12 pr-4 py-4 rounded-xl border border-zinc-800"
                  />
                </View>
              </View>
            )}

            {/* Action Button */}
            <Pressable
              onPress={step === "verify" ? handleSignIn : handleSaveNewPassword}
              className={`w-full py-4 rounded-full items-center ${
                step === "newPassword" ? "bg-[#bbf7d0]" : "bg-white"
              }`}
            >
              <Text className={`${step === 'verify' ? 'text-black' : 'text-white'} font-bold text-lg`}>
                {step === "verify" ? "Sign in" : "Continue"}
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
