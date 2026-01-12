import React from "react";
import { View } from "react-native";
import { ProgressBarProps } from "../types";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <View className="flex-row px-6 gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          className={`flex-1 h-1 rounded-full ${
            index < currentStep ? "bg-white" : "bg-zinc-800"
          }`}
        />
      ))}
    </View>
  );
};

export default ProgressBar;
