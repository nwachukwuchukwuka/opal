import { DAYS_OF_WEEK } from "@/constants";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface DayOfWeekSelectorProps {
  activeDays: number[];
  onToggleDay: (dayId: number) => void;
}

export const DayOfWeekSelector = ({ activeDays, onToggleDay }: DayOfWeekSelectorProps) => (
  <View className="flex-row justify-between items-center">
    {DAYS_OF_WEEK.map((day) => {
      const isActive = activeDays.includes(day.id);
      return (
        <Pressable
          key={day.id}
          onPress={() => onToggleDay(day.id)}
          className={`w-10 h-10 rounded-full items-center justify-center ${
            isActive ? "bg-white" : "bg-zinc-700"
          }`}
        >
          <Text className={`font-bold text-base ${isActive ? "text-black" : "text-zinc-400"}`}>
            {day.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);