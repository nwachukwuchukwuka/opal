import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      className={`w-full py-6 px-8 rounded-[28px] mb-4 border-2 ${
        isSelected
          ? "border-emerald-500 bg-emerald-50/50"
          : "border-slate-100 bg-white"
      } active:scale-[0.98] transition-transform`}
    >
      <Text
        className={`text-center text-lg ${
          isSelected ? "text-emerald-600 font-bold" : "text-slate-500 font-bold"
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
    router.push("/onboarding/occupation");
  };

  const handleSkip = () => {
    router.push("/onboarding/occupation");
  };

  const canContinue = selectedOption !== null;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-slate-50">
      <View className="flex-1 px-8 pt-12">
        {/* Skip button */}
        <View className="items-end mb-4">
          <Pressable onPress={handleSkip} className="py-2 px-6 bg-slate-100 rounded-full">
            <Text className="text-slate-500 text-sm font-bold">Skip</Text>
          </Pressable>
        </View>

        {/* Question Header */}
        <View className="mb-12">
          <Text className="text-slate-900 text-3xl font-bold mb-3 leading-tight">
            How old are you?
          </Text>
          <Text className="text-slate-500 text-base font-medium leading-6">
            So we can suggest the best setup for your life stage.
          </Text>
        </View>

        {/* Options Grid */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
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

      {/* Continue Action Zone */}
      <View className="px-8 pb-12 pt-6">
        <Pressable
          onPress={handleContinue}
          disabled={!canContinue}
          className={`w-full py-6 rounded-[32px] ${
            canContinue ? "bg-emerald-600" : "bg-slate-200"
          }`}
        >
          <Text
            className={`text-center text-xl font-bold ${
              canContinue ? "text-white" : "text-slate-400"
            }`}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
