import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

// Age Options
const ageOptions = [
  { id: "under18", label: "Under 18" },
  { id: "18-24", label: "18 - 24" },
  { id: "25-34", label: "25 - 34" },
  { id: "35-44", label: "35 - 44" },
  { id: "45-54", label: "45 - 54" },
  { id: "55-64", label: "55 - 64" },
  { id: "over64", label: "Over 64" },
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

export default function AgeScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleContinue = () => {
    // Navigate to occupation question
    router.push("/onboarding/occupation");
  };

  const handleSkip = () => {
    // Skip and go to occupation
    router.push("/onboarding/occupation");
  };

  const canContinue = selectedOption !== null;

  return (
    <View className="flex-1 bg-black pt-14">
      <StatusBar barStyle="light-content" />

      {/* Content */}
      <View className="flex-1 pt-6 px-6">
        {/* Skip button */}
        <View className="items-end mb-2">
          <Pressable onPress={handleSkip} className="py-2 px-4">
            <Text className="text-zinc-500 text-sm">Skip</Text>
          </Pressable>
        </View>

        {/* Question */}
        <View className="mb-8">
          <Text className="text-white text-[28px] font-bold mb-2 leading-tight">
            How old are you?
          </Text>
          <Text className="text-zinc-500 text-sm">
            So we can suggest the best setup for you.
          </Text>
        </View>

        {/* Options */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {ageOptions.map((option) => (
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

