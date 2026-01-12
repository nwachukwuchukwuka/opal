import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function GemNameScreen() {
  const [gemName, setGemName] = useState("");

  const handleContinue = () => {
    router.push("/onboarding/add-friends");
  };

  const canContinue = gemName.length >= 3;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-black"
    >
      <StatusBar barStyle="light-content" />

      <View className="flex-1 pt-14 px-6">
        {/* Title */}
        <View className="flex-1 justify-center">
          <Text className="text-white text-[28px] font-bold text-center mb-2">
            What should we call you?
          </Text>
          <Text className="text-zinc-500 text-base text-center mb-8">
            Choose a unique gem name
          </Text>

          {/* Input */}
          <View className="relative">
            <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Text className="text-blue-400 text-lg">💎</Text>
            </View>
            <TextInput
              className="w-full py-4 pl-12 pr-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-base"
              placeholder="Gem name"
              placeholderTextColor="#71717a"
              value={gemName}
              onChangeText={setGemName}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Continue Button */}
        <View className="pb-10">
          <Pressable
            onPress={handleContinue}
            disabled={!canContinue}
            className={`w-full py-4 rounded-full ${
              canContinue ? "bg-white" : "bg-zinc-800"
            } active:opacity-90`}
          >
            <Text
              className={`text-center text-lg font-semibold ${
                canContinue ? "text-black" : "text-zinc-600"
              }`}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

