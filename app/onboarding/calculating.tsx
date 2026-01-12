import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  View,
} from "react-native";

const loadingSteps = [
  { text: "Calculating", duration: 1500 },
  { text: "Preparing report...", duration: 1500 },
];

export default function CalculatingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    // Move to next step or navigate away
    const stepTimeout = setTimeout(() => {
      if (currentStep < loadingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        setProgress(0);
      } else {
        router.replace("/onboarding/(results)/news-intro");
      }
    }, loadingSteps[currentStep].duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep]);

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <StatusBar barStyle="light-content" />

      {/* Loading Text */}
      <Text className="text-white text-lg mb-8">
        {loadingSteps[currentStep].text}
      </Text>

      {/* Progress Bar */}
      <View className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <View
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
}

