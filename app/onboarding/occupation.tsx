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
      className={`w-full py-4 px-5 rounded-xl mb-3 border flex-row items-center ${
        isSelected
          ? "border-white bg-white/10"
          : "border-zinc-800 bg-zinc-900/50"
      } active:bg-white/5`}
    >
      <Text className="text-xl mr-3">{icon}</Text>
      <Text
        className={`text-base ${
          isSelected ? "text-white font-semibold" : "text-zinc-300"
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
    <SafeAreaView edges={["top"]} className="flex-1 bg-black">
      {/* Content */}
      <View className="flex-1 pt-6 px-6">
        {/* Question */}
        <View className="mb-8">
          <Text className="text-white text-[20px] font-bold mb-2 leading-tight">
            What is your occupation?
          </Text>
        </View>

        {/* Options */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
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
    </SafeAreaView>
  );
}
