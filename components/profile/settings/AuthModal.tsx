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

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

type AuthMode = "login" | "signup";
type InputMethod = "email" | "phone";

export const AuthModal = ({
  visible,
  onClose,
  onLoginSuccess,
}: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [method, setMethod] = useState<InputMethod>("email");

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleToggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  const handleToggleMethod = () => {
    setMethod((prev) => (prev === "email" ? "phone" : "email"));
  };

  const handleSubmit = () => {
    // In a real app, perform auth logic here
    onLoginSuccess();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-black justify-between">
          {/* Header */}
          <View className="px-4 pt-2 flex-row justify-between items-center">
            <Pressable onPress={onClose}>
              {/* Back arrow if needed, or empty for layout */}
              <Ionicons
                name="chevron-back"
                size={28}
                color={mode === "signup" ? "transparent" : "white"}
              />
            </Pressable>
            <Text className="text-white text-3xl font-bold tracking-tight">
              Opal
            </Text>
            <Pressable onPress={onClose}>
              <Text className="text-zinc-500 font-bold">Skip</Text>
            </Pressable>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 px-6 justify-center"
          >
            {/* Title Section */}
            <View className="mb-8 items-center">
              <Text className="text-white text-2xl font-bold mb-2">
                {mode === "login"
                  ? "Welcome back"
                  : "Let's create your account"}
              </Text>
              <Text className="text-zinc-400 text-center">
                {mode === "login"
                  ? "Let's get you in to Opal"
                  : "Link your phone number to Opal account to connect with your friends who use Opal"}
              </Text>
            </View>

            {/* Inputs */}
            <View className="gap-4 mb-6">
              {method === "phone" ? (
                <View className="flex-row items-center bg-zinc-900 rounded-xl border border-zinc-800 px-4 py-4">
                  <Text className="text-xl mr-3">🇸🇬</Text>
                  <Text className="text-zinc-400 text-lg mr-1">+65</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="8123 4567"
                    placeholderTextColor="#52525b"
                    keyboardType="phone-pad"
                    className="flex-1 text-white text-lg h-full"
                    autoFocus
                  />
                </View>
              ) : (
                <>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Your Email"
                    placeholderTextColor="#52525b"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="w-full bg-zinc-900 text-white text-lg px-4 py-4 rounded-xl border border-zinc-800"
                  />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Your Password"
                    placeholderTextColor="#52525b"
                    secureTextEntry
                    className="w-full bg-zinc-900 text-white text-lg px-4 py-4 rounded-xl border border-zinc-800"
                  />
                  {mode === "login" && (
                    <Pressable className="self-center mt-2">
                      <Text className="text-zinc-500">Forgot password?</Text>
                    </Pressable>
                  )}
                </>
              )}
            </View>

            {/* Main Action Button */}
            <Pressable
              onPress={handleSubmit}
              className="w-full bg-white py-4 rounded-full items-center mb-8"
            >
              <Text className="text-black font-bold text-lg">
                {mode === "login" ? "Sign in" : "Next"}
              </Text>
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center mb-8">
              <View className="flex-1 h-[1px] bg-zinc-800" />
              <Text className="text-zinc-500 mx-4">or</Text>
              <View className="flex-1 h-[1px] bg-zinc-800" />
            </View>

            {/* Social Logins */}
            <View className="gap-3 mb-8">
              <Pressable className="w-full bg-zinc-900 py-4 rounded-full items-center flex-row justify-center border border-zinc-800">
                <Ionicons name="logo-apple" size={20} color="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  {mode === "login"
                    ? "Sign In With Apple"
                    : "Sign Up With Apple"}
                </Text>
              </Pressable>

              <Pressable
                onPress={handleToggleMethod}
                className="w-full bg-zinc-900 py-4 rounded-full items-center flex-row justify-center border border-zinc-800"
              >
                <Ionicons
                  name={method === "email" ? "call" : "mail"}
                  size={20}
                  color="white"
                />
                <Text className="text-white font-bold text-lg ml-2">
                  {method === "email"
                    ? mode === "login"
                      ? "Sign In With Phone"
                      : "Sign Up With Phone"
                    : mode === "login"
                      ? "Sign In With Email"
                      : "Sign Up With Email"}
                </Text>
              </Pressable>
            </View>

            {/* Toggle Login/Signup */}
            <View className="flex-row justify-center">
              <Text className="text-zinc-500">
                {mode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
              </Text>
              <Pressable onPress={handleToggleMode}>
                <Text className="text-white font-bold">
                  {mode === "login" ? "Sign up" : "Log in"}
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
