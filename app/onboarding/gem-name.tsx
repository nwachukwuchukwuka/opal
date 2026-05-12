import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GemNameScreen() {
  const [gemName, setGemName] = useState("");

  const handleContinue = () => {
    router.push("/onboarding/add-friends");
  };

  const canContinue = gemName.length >= 3;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-50"
    >
      <SafeAreaView edges={["top"]} className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-10">
          {/* Content */}
          <View className="flex-1">
            <Text className="text-emerald-600 text-sm font-bold mb-3 text-center uppercase">Profile</Text>
            <Text className="text-slate-900 text-3xl font-bold text-center mb-4 leading-tight">
              What should we call you?
            </Text>
            <Text className="text-slate-500 text-lg text-center mb-10 font-medium">
              Choose a unique name for your focus journey.
            </Text>

            {/* Input Bento Module */}
            <View className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm shadow-slate-200/50">
              <View className="flex-row items-center mb-2">
                <View className="w-10 h-10 bg-emerald-50 rounded-xl items-center justify-center mr-3 border border-emerald-100/50">
                  <Text className="text-xl">💎</Text>
                </View>
                <Text className="text-slate-400 font-bold text-xs uppercase">Your gem name</Text>
              </View>

              <TextInput
                className="w-full py-4 text-slate-900 text-2xl font-bold"
                placeholder="Zenith name"
                placeholderTextColor="#cbd5e1"
                value={gemName}
                onChangeText={setGemName}
                autoCapitalize="none"
                autoCorrect={false}
                selectionColor="#059669"
              />

              <View className={`h-1 w-full rounded-full ${canContinue ? 'bg-emerald-600' : 'bg-slate-100'}`} />
            </View>
          </View>

          {/* Continue Action Zone */}
          <View className="pb-3 mt-10">
            <Pressable
              onPress={handleContinue}
              disabled={!canContinue}
              className={`w-full py-6 rounded-[32px] items-center justify-center ${canContinue ? "bg-emerald-600" : "bg-slate-200"
                }`}
            >
              <Text
                className={`text-xl font-bold ${canContinue ? "text-white" : "text-slate-400"
                  }`}
              >
                Continue
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
