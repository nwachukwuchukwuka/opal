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
  email: string;
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
    if (currentPassword.length > 0) {
      setStep("newPassword");
    }
  };

  const handleSaveNewPassword = () => {
    onClose();
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
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 px-8">
            {/* Minimalist Top Nav */}
            <View className="flex-row justify-between items-center pt-4 mb-10">
              <Pressable
                onPress={onClose}
                className="w-11 h-11 bg-slate-50 rounded-full items-center justify-center border border-slate-100"
              >
                <Ionicons name="close" size={24} color="#059669" />
              </Pressable>
              {step === "verify" && (
                <Pressable onPress={onClose}>
                  <Text className="text-slate-400 font-semibold text-sm">Cancel</Text>
                </Pressable>
              )}
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1  pb-20"
            >
              {step === "verify" ? (
                <>
                  <View className="mb-12">
                    <Text className="text-slate-900 text-4xl font-bold mb-3 tracking-tight">
                      Security Check
                    </Text>
                    <Text className="text-slate-400 text-lg leading-6 font-medium">
                      Confirm your identity to proceed with updating your password.
                    </Text>
                  </View>

                  <View className="gap-4 mb-12">
                    <View className="bg-slate-50 rounded-3xl border border-slate-100 px-6 py-4 opacity-60">
                      <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Email</Text>
                      <Text className="text-slate-600 text-base font-semibold">{email}</Text>
                    </View>
                    <View className="bg-slate-50 rounded-3xl border border-slate-100 px-6 py-5">
                      <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Current Password</Text>
                      <TextInput
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="••••••••"
                        placeholderTextColor="#cbd5e1"
                        secureTextEntry
                        autoFocus
                        className="text-slate-900 text-xl font-semibold"
                      />
                    </View>
                    <Pressable className="self-end px-2">
                      <Text className="text-emerald-600 font-bold text-sm">Forgot password?</Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <View className="mb-12">
                    <Text className="text-slate-900 text-4xl font-bold mb-3 tracking-tight">
                      New Password
                    </Text>
                    <Text className="text-slate-400 text-lg leading-6 font-medium">
                      Ensure your account remains secure by choosing a strong, unique password.
                    </Text>
                  </View>

                  <View className="bg-slate-50 rounded-3xl border border-slate-100 px-6 py-6 mb-12">
                    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Secure Password</Text>
                    <TextInput
                      value={newPassword}
                      onChangeText={setNewPassword}
                      placeholder="Min. 8 characters"
                      placeholderTextColor="#cbd5e1"
                      secureTextEntry
                      autoFocus
                      className="text-slate-900 text-2xl font-semibold"
                    />
                  </View>
                </>
              )}

              <Pressable
                onPress={step === "verify" ? handleSignIn : handleSaveNewPassword}
                className="w-full bg-emerald-600 py-6 rounded-full items-center"
              >
                <Text className="text-white font-bold text-lg">
                  {step === "verify" ? "Continue" : "Update Password"}
                </Text>
              </Pressable>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
