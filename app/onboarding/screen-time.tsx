import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      className={`w-full py-6 px-8 rounded-[28px] mb-4 border-2 ${isSelected
        ? "border-emerald-500 bg-emerald-50/50"
        : "border-slate-100 bg-white"
        } active:scale-[0.98] transition-transform`}
    >
      <Text
        className={`text-center text-lg ${isSelected ? "text-emerald-600 font-bold" : "text-slate-500 font-bold"
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
    <SafeAreaView edges={["top"]} className="flex-1 bg-slate-50">
      <View className="flex-1 px-8 pt-12">
        {/* Question Header */}
        <View className="mb-12">
          <Text className="text-slate-900 text-3xl font-bold mb-3 leading-tight">
            What is your daily average screen time?
          </Text>
          <Text className="text-slate-500 text-base font-medium leading-6">
            On your phone only. Your best guess is perfectly fine.
          </Text>
        </View>

        {/* Options Grid */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
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

      {/* Continue Action Zone */}
      <View className="px-8 pb-12 pt-6">
        <Pressable
          onPress={handleContinue}
          disabled={!canContinue}
          className={`w-full py-6 rounded-[32px] ${canContinue ? "bg-emerald-600" : "bg-slate-200"
            }`}
        >
          <Text
            className={`text-center text-xl font-bold ${canContinue ? "text-white" : "text-slate-400"
              }`}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

