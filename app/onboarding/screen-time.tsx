import { router } from "expo-router";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";

// Screen Time Options
const screenTimeOptions = [
  { id: "under1", label: "Under 1 hour" },
  { id: "1-3", label: "1-3 hours" },
  { id: "3-4", label: "3-4 hours" },
  { id: "4-5", label: "4-5 hours" },
  { id: "5-7", label: "5-7 hours" },
  { id: "more7", label: "More than 7 hours" },
];

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full py-4 px-6 rounded-xl mb-3 border ${
        isSelected
          ? "border-white bg-white/10"
          : "border-zinc-800 bg-zinc-900/50"
      } active:bg-white/5`}
    >
      <Text
        className={`text-center text-base ${
          isSelected ? "text-white font-semibold" : "text-zinc-300"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default function ScreenTimeScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleContinue = () => {
    router.push("/onboarding/age");
  };

  const canContinue = selectedOption !== null;

  return (
    <View className="flex-1 bg-black pt-14">
      <StatusBar barStyle="light-content" />

      {/* Content */}
      <View className="flex-1 pt-6 px-6">
        {/* Question */}
        <View className="mb-8">
          <Text className="text-white text-[28px] font-bold mb-2 leading-tight">
            What is your daily average{"\n"}Screen Time?
          </Text>
          <Text className="text-zinc-500 text-sm">
            On your phone only. Your best guess is ok.
          </Text>
        </View>

        {/* Options */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {screenTimeOptions.map((option) => (
            <OptionButton
              key={option.id}
              label={option.label}
              isSelected={selectedOption === option.id}
              onPress={() => setSelectedOption(option.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Continue Button */}
      <View className="px-6 pb-10">
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
  );
}

