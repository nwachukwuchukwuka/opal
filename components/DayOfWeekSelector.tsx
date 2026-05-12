import { DAYS_OF_WEEK } from "@/constants";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface DayOfWeekSelectorProps {
  activeDays: number[];
  onToggleDay: (dayId: number) => void;
}

export const DayOfWeekSelector = ({ activeDays, onToggleDay }: DayOfWeekSelectorProps) => (
  <View className="flex-row justify-between items-center px-1">
    {DAYS_OF_WEEK.map((day) => {
      const isActive = activeDays.includes(day.id);
      return (
        <Pressable
          key={day.id}
          onPress={() => onToggleDay(day.id)}
          className={`w-10 h-10 rounded-full items-center justify-center border ${isActive ? "bg-emerald-600 border-emerald-600" : "bg-slate-50 border-slate-100"
            }`}
        >
          <Text className={`font-bold text-sm ${isActive ? "text-white" : "text-slate-400"}`}>
            {day.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);