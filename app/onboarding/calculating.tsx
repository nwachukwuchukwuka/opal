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
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 40);

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
    <View className="flex-1 bg-slate-50 items-center justify-center px-10">

      {/* Decorative pulse element */}
      <View className="w-24 h-24 bg-emerald-50 rounded-[32px] items-center justify-center mb-12 border border-emerald-100/50">
        <View className="w-10 h-10 bg-emerald-600 rounded-full opacity-20 animate-ping absolute" />
        <View className="w-4 h-4 bg-emerald-600 rounded-full" />
      </View>

      {/* Loading Text */}
      <Text className="text-slate-900 text-2xl font-bold mb-8 text-center leading-tight">
        {loadingSteps[currentStep].text}
      </Text>

      {/* Progress Bar Container */}
      <View className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <View
          className="h-full bg-emerald-600 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>

      <Text className="text-slate-400 font-bold text-sm mt-6">
        Analyzing your digital habits...
      </Text>
    </View>
  );
}

