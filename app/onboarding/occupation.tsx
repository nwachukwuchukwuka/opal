import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Occupation Options
const occupationOptions = [
  { id: "software", label: "Software Development", icon: "💻" },
  { id: "ceo", label: "CEO/Founder", icon: "👔" },
  { id: "remote", label: "Remote Worker", icon: "🏠" },
  { id: "finance", label: "Finance/Ops/Consulting", icon: "📊" },
  { id: "art", label: "Art/Content", icon: "🎨" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "other", label: "Other", icon: "⚙️" },
];

interface OptionButtonProps {
  label: string;
  icon: string;
  isSelected: boolean;
  onPress: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  icon,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full py-5 px-8 rounded-[28px] mb-4 border-2 flex-row items-center ${
        isSelected
          ? "border-emerald-500 bg-emerald-50/50"
          : "border-slate-100 bg-white"
      } active:scale-[0.98] transition-transform`}
    >
      <View className={`w-12 h-12 rounded-2xl items-center justify-center ${isSelected ? 'bg-emerald-600' : 'bg-slate-50'}`}>
        <Text className="text-xl">{icon}</Text>
      </View>
      <Text
        className={`text-lg ml-4 ${
          isSelected ? "text-emerald-600 font-bold" : "text-slate-500 font-bold"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default function OccupationScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleContinue = () => {
    router.push("/onboarding/calculating");
  };

  const canContinue = selectedOption !== null;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-slate-50">
      <View className="flex-1 px-8 pt-12">
        {/* Question Header */}
        <View className="mb-12">
          <Text className="text-slate-900 text-3xl font-bold mb-3 leading-tight">
            What is your occupation?
          </Text>
          <Text className="text-slate-500 text-base font-medium leading-6">
            Help us tailor the experience to your daily workflow.
          </Text>
        </View>

        {/* Options Grid */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {occupationOptions.map((option) => (
            <OptionButton
              key={option.id}
              label={option.label}
              icon={option.icon}
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
