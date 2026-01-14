import React from "react";
import { Text, View } from "react-native";

export const PageBarChart = () => {
  const bars = [
    {
      day: "Tue",
      height: "h-24",
      color: "bg-gradient-to-t from-red-900 to-red-400",
    }, 
    { day: "Wed", height: "h-24", color: "bg-zinc-700" },
    { day: "Thu", height: "h-24", color: "bg-zinc-700" },
    { day: "Fri", height: "h-20", color: "bg-zinc-700" },
    { day: "Sat", height: "h-20", color: "bg-zinc-700" },
    { day: "Sun", height: "h-28", color: "bg-zinc-700" },
    { day: "Mon", height: "h-28", color: "bg-zinc-700" },
  ];

  return (
    <View className="w-full">
      <Text className="text-white text-md text-center mb-8">
        Your most productive day is likely to be{" "}
        <Text className="text-teal-400 font-bold">Saturday</Text> with{" "}
        <Text className="text-teal-400 font-bold">5h 11m</Text> of screen time
      </Text>

      {/* Chart */}
      <View className="flex-row justify-between items-end h-48 mb-8 px-2">
        {bars.map((bar, i) => (
          <View key={i} className="items-center gap-2">
            <Text className="text-[10px] text-zinc-500">5h 15m</Text>
            <View
              className={`w-8 rounded-t-sm ${i === 5 ? "bg-gradient-to-b from-red-400 to-transparent" : "bg-zinc-800"}`}
              style={{ height: i === 5 ? 120 : 100 }}
            >
              {i === 5 && (
                <View className="w-full h-full bg-red-500 opacity-50" />
              )}
            </View>
            <Text className="text-zinc-500 text-xs">{bar.day}</Text>
          </View>
        ))}
      </View>

      <Text className="text-white text-lg text-center mb-16">
        Your most distracting day is likely to be{" "}
        <Text className="text-red-400 font-bold">Sunday</Text> with{" "}
        <Text className="text-red-400 font-bold">5h 19m</Text> of screen time
      </Text>

      <View className="bg-zinc-900 w-full p-3 rounded-2xl border border-zinc-800">
        <Text className="text-zinc-500 text-sm tracking-widest text-center mb-1">
          Did you know
        </Text>
        <Text className="text-white text-center text-sm">
          You can create additional schedules to automatically block apps during
          your most distracting days
        </Text>
      </View>
    </View>
  );
};
