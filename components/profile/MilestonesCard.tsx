import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import MilestonesSheet, { MilestonesSheetRef } from "./Milestones/MilestonesSheet";

const MILESTONES = [
  { id: 1, color: "#059669", label: "Starter" },
  { id: 2, color: "#10b981", label: "Active" },
  { id: 3, color: "#34d399", label: "Pro" },
  { id: 4, color: "#0d9488", label: "Elite" },
  { id: 5, color: "#065f46", label: "Legend" },
];

export const MilestonesCard = () => {
  const sheetRef = useRef<MilestonesSheetRef>(null);

  const handleOpenSheet = () => {
    sheetRef.current?.present();
  };

  return (
    <>
      <View className="bg-white border border-slate-200 rounded-[44px] p-7 mb-2">
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-slate-900 text-xl font-semibold">My Milestones</Text>
          <View className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <Text className="text-emerald-700 font-bold text-[10px]">5 Active</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-10"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View className="flex-row gap-5">
            {MILESTONES.map((stone) => (
              <View
                key={stone.id}
                className="w-24 items-center"
              >
                <View className="w-20 h-20 bg-slate-50 rounded-[32px] items-center justify-center border border-slate-200 mb-3">
                  <Ionicons name="diamond" size={32} color={stone.color} />
                </View>
                <Text className="text-slate-400 text-[10px] font-semibold">{stone.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <Pressable
          onPress={handleOpenSheet}
          className="bg-emerald-600 rounded-[28px] py-5 items-center justify-center"
        >
          <Text className="text-white font-bold text-base">View All Milestones</Text>
        </Pressable>
      </View>

      <MilestonesSheet ref={sheetRef} />
    </>
  );
};
