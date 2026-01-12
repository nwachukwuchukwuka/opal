import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import MilestonesSheet, { MilestonesSheetRef } from "./Milestones/MilestonesSheet";

const MILESTONES = [
  { id: 1, color: "#f59e0b" },
  { id: 2, color: "#06b6d4" },
  { id: 3, color: "#8b5cf6" },
  { id: 4, color: "#3b82f6" },
  { id: 5, color: "#10b981" },
];

export const MilestonesCard = () => {
  const sheetRef = useRef<MilestonesSheetRef>(null);

  const handleOpenSheet = () => {
    sheetRef.current?.present();
  };

  return (
    <>
      <View className="bg-zinc-900 rounded-3xl p-5 mb-6">
        <Text className="text-white text-lg font-bold mb-4">My MileStones</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          <View className="flex-row gap-3">
            {MILESTONES.map((stone) => (
              <View
                key={stone.id}
                className="w-16 h-16 bg-zinc-800 rounded-xl items-center justify-center border border-zinc-700"
              >
                <View
                  style={{
                    shadowColor: stone.color,
                    shadowRadius: 10,
                    shadowOpacity: 0.8,
                  }}
                >
                  <Ionicons name="diamond" size={24} color={stone.color} />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <Pressable
          onPress={handleOpenSheet}
          className="bg-white rounded-full py-3.5 items-center"
        >
          <Text className="text-black font-bold text-base">View All</Text>
        </Pressable>
      </View>

      <MilestonesSheet ref={sheetRef} />
    </>
  );
};
