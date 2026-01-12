import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { REFERRAL_OPTIONS, COLORS } from "../../constants";

export default function ReferralSourceScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [friendCode, setFriendCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["40%"], []);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === "friend") {
      bottomSheetRef.current?.expand();
    }
  };

  const handleContinue = () => {
    // Navigate to main app tabs
    router.replace("/(tabs)");
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  const handleCodeSubmit = () => {
    // Validate friend code
    if (friendCode.length < 5) {
      setCodeError("This code doesn't exist");
      return;
    }
    setCodeError(null);
    bottomSheetRef.current?.close();
    // Continue to main app tabs
    router.replace("/(tabs)");
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-black pt-14">
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View className="items-center px-6 mb-6">
          <Text className="text-white text-[28px] font-bold text-center">
            How did you hear{"\n"}about Opal?
          </Text>
        </View>

        {/* Options */}
        <View className="flex-1 px-6">
          {REFERRAL_OPTIONS.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => handleOptionSelect(option.id)}
                className={`py-3.5 px-6 rounded-full mb-3 border ${
                  isSelected
                    ? "bg-white border-white"
                    : "bg-transparent border-zinc-700"
                }`}
              >
                <Text
                  className={`text-center text-base ${
                    isSelected ? "text-black font-semibold" : "text-white"
                  }`}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Continue Button */}
        <View className="px-6 pb-4">
          <Pressable
            onPress={handleContinue}
            disabled={!selectedOption}
            className={`w-full py-4 rounded-full ${
              selectedOption
                ? "bg-white active:bg-zinc-200"
                : "border border-white/20 bg-white/[0.03]"
            }`}
          >
            <Text
              className={`text-center text-lg font-semibold ${
                selectedOption ? "text-black" : "text-zinc-500"
              }`}
            >
              Continue
            </Text>
          </Pressable>
        </View>

        {/* Skip */}
        <View className="px-6 pb-10">
          <Pressable onPress={handleSkip} className="py-3">
            <Text className="text-zinc-500 text-center text-base">Skip</Text>
          </Pressable>
        </View>

        {/* Bottom Sheet for Friend Code */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: "#18181b" }}
          handleIndicatorStyle={{ backgroundColor: "#52525b" }}
        >
          <BottomSheetView className="flex-1 px-6">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1"
            >
              {/* Title */}
              <View className="items-center mb-6">
                <Text className="text-white text-xl font-bold text-center">
                  Enter Your Friend's Code
                </Text>
                <Text className="text-zinc-500 text-sm mt-1">
                  Get Opal Pro for 30 days and more
                </Text>
              </View>

              {/* Code Input */}
              <View className="mb-4">
                <View
                  className={`border-b-2 pb-2 ${
                    codeError ? "border-red-500" : "border-zinc-600"
                  }`}
                >
                  <TextInput
                    value={friendCode}
                    onChangeText={(text) => {
                      setFriendCode(text.toUpperCase());
                      setCodeError(null);
                    }}
                    placeholder="OPAL34"
                    placeholderTextColor="#52525b"
                    className="text-white text-lg text-center"
                    autoCapitalize="characters"
                    autoCorrect={false}
                  />
                </View>
                {codeError && (
                  <Text className="text-red-500 text-sm text-center mt-2">
                    {codeError}
                  </Text>
                )}
              </View>

              {/* Submit Button */}
              <Pressable
                onPress={handleCodeSubmit}
                className="w-full py-4 rounded-full border border-white/20 bg-white/[0.03] active:bg-white/10 mt-4"
              >
                <Text className="text-white text-center text-lg font-semibold">
                  Continue
                </Text>
              </Pressable>
            </KeyboardAvoidingView>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

