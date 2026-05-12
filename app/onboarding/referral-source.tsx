import ReferralInputSheet, {
  ReferralInputSheetRef,
} from "@/components/onboarding/ReferralInputSheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const SOURCES = [
  "Search engine",
  "Through a friend",
  "Facebook or Instagram",
  "App Store",
  "TikTok",
  "Twitter",
  "LinkedIn",
  "Reddit or blog",
  "YouTube",
  "Snapchat",
  "Other",
];

export default function ReferralSourceScreen() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const bottomSheetRef = useRef<ReferralInputSheetRef>(null);

  const handleSelect = (source: string) => {
    setSelectedSource(source);
    if (source === "Through a friend") {
      bottomSheetRef.current?.present();
    }
  };

  const handleContinue = () => {
    router.replace("/(tabs)");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-slate-50">
          <SafeAreaView className="flex-1 relative" edges={["top"]}>

            {/* Redesigned Left-Aligned Header */}
            <View className="px-6 pt-12 pb-6">
              <View className="bg-emerald-100 self-start px-4 py-2 rounded-[16px] mb-6">
                <Text className="text-emerald-800 text-xs font-bold">
                  One last thing
                </Text>
              </View>
              <Text className="text-slate-900 text-4xl font-extrabold leading-[44px]">
                How did you hear about Zenith?
              </Text>
            </View>

            {/* Redesigned Dynamic Flexible Grid */}
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 140 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="flex-row flex-wrap gap-3">
                {SOURCES.map((source) => {
                  const isSelected = selectedSource === source;
                  return (
                    <Pressable
                      key={source}
                      onPress={() => handleSelect(source)}
                      className={`px-6 py-4 rounded-[24px] items-center justify-center grow ${isSelected
                        ? "bg-emerald-600"
                        : "bg-white border border-slate-200"
                        }`}
                    >
                      <Text
                        className={`font-bold text-base ${isSelected ? "text-white" : "text-slate-600"
                          }`}
                      >
                        {source}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {/* Redesigned Structured Action Dock */}
            <View className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-6 pt-6 pb-12">
              {selectedSource && selectedSource !== "Through a friend" ? (
                <Pressable
                  onPress={handleContinue}
                  className="w-full bg-emerald-600 py-5 rounded-[28px] items-center justify-center"
                >
                  <Text className="text-white font-bold text-lg">Continue</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={handleContinue}
                  className="w-full py-5 items-center bg-slate-50 border border-slate-200 rounded-[28px]"
                >
                  <Text className="text-slate-500 font-bold text-lg">
                    Skip for now
                  </Text>
                </Pressable>
              )}
            </View>

          </SafeAreaView>

          {/* Logic elements remain untouched */}
          <ReferralInputSheet ref={bottomSheetRef} onSuccess={handleContinue} />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}