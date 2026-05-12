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
    onLoginSuccess();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
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
              <Text className="text-slate-900 text-2xl font-bold tracking-tighter">Opal</Text>
              <Pressable onPress={onClose}>
                <Text className="text-slate-400 font-semibold text-sm">Skip</Text>
              </Pressable>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1"
            >
              {/* Identity Header */}
              <View className="mb-12">
                <Text className="text-slate-900 text-4xl font-bold mb-3 tracking-tight">
                  {mode === "login" ? "Welcome back" : "Create account"}
                </Text>
                <Text className="text-slate-400 text-lg leading-6 font-medium">
                  {mode === "login"
                    ? "Sign in to continue your focus journey with Opal."
                    : "Join thousands of gems improving their digital well-being."}
                </Text>
              </View>

              {/* Form Input Group */}
              <View className="gap-4 mb-8">
                {method === "phone" ? (
                  <View className="flex-row items-center bg-slate-50 rounded-3xl border border-slate-100 px-5 py-5">
                    <Text className="text-xl mr-3">🇸🇬</Text>
                    <Text className="text-slate-400 text-lg mr-2 font-semibold">+65</Text>
                    <TextInput
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="8123 4567"
                      placeholderTextColor="#94a3b8"
                      keyboardType="phone-pad"
                      className="flex-1 text-slate-900 text-lg"
                      autoFocus
                    />
                  </View>
                ) : (
                  <>
                    <View className="bg-slate-50 rounded-3xl border border-slate-100 px-5 py-5">
                      <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email address"
                        placeholderTextColor="#94a3b8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="text-slate-900 text-lg"
                      />
                    </View>
                    <View className="bg-slate-50 rounded-3xl border border-slate-100 px-5 py-5">
                      <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        placeholderTextColor="#94a3b8"
                        secureTextEntry
                        className="text-slate-900 text-lg"
                      />
                    </View>
                    {mode === "login" && (
                      <Pressable className="self-end mt-1">
                        <Text className="text-emerald-600 font-bold text-sm">Forgot password?</Text>
                      </Pressable>
                    )}
                  </>
                )}
              </View>

              {/* Primary Action */}
              <Pressable
                onPress={handleSubmit}
                className="w-full bg-emerald-600 py-6 rounded-full items-center mb-8"
              >
                <Text className="text-white font-bold text-lg">
                  {mode === "login" ? "Sign In" : "Get Started"}
                </Text>
              </Pressable>

              {/* Aesthetic Divider */}
              <View className="flex-row items-center mb-10 px-4">
                <View className="flex-1 h-[1px] bg-slate-100" />
                <Text className="text-slate-300 text-[10px] font-bold uppercase tracking-widest mx-4">Secure Sign In</Text>
                <View className="flex-1 h-[1px] bg-slate-100" />
              </View>

              {/* Secondary Actions Grid */}
              <View className="gap-4 mb-10">
                <Pressable className="w-full bg-white py-5 rounded-full items-center flex-row justify-center border border-slate-100">
                  <Ionicons name="logo-apple" size={20} color="#020617" />
                  <Text className="text-slate-900 font-bold text-base ml-2">Continue with Apple</Text>
                </Pressable>

                <Pressable
                  onPress={handleToggleMethod}
                  className="w-full bg-white py-5 rounded-full items-center flex-row justify-center border border-slate-100"
                >
                  <Ionicons
                    name={method === "email" ? "call" : "mail"}
                    size={20}
                    color="#059669"
                  />
                  <Text className="text-emerald-700 font-bold text-base ml-2">
                    {method === "email" ? "Sign in with phone" : "Sign in with email"}
                  </Text>
                </Pressable>
              </View>

              {/* Footer Toggle */}
              <View className="flex-row justify-center pb-8">
                <Text className="text-slate-400 font-medium">
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                </Text>
                <Pressable onPress={handleToggleMode}>
                  <Text className="text-emerald-600 font-bold">
                    {mode === "login" ? "Sign up" : "Log in"}
                  </Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
