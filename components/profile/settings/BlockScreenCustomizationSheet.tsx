import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type BlockScreenCustomizationSheetRef = BottomSheetModal;

const THEMES = [
  {
    id: "default",
    title: "Default",
    description: "The classic Opal experience.",
    icon: "⚪",
  },
  {
    id: "pop",
    title: "Pop Culture",
    description:
      "Funny references when you open distracting apps.",
    icon: "🍿",
  },
  {
    id: "haiku",
    title: "Focus Haiku",
    description:
      "Pieces of wisdom to keep you on track.",
    icon: "🪶",
  },
  {
    id: "luminaries",
    title: "Luminaries",
    description:
      "Inspiration from influential thinkers.",
    icon: "👨‍💼",
  },
];

const BlockScreenCustomizationSheet =
  forwardRef<BlockScreenCustomizationSheetRef>((props, ref) => {
    const snapPoints = useMemo(() => ["92%"], []);
    const [activeTheme, setActiveTheme] = useState("default");

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
        >
          <View className="mb-10">
            <Text className="text-slate-900 text-3xl font-bold mb-3">
              Block Screen
            </Text>
            <Text className="text-slate-400 text-base leading-6 font-medium">
              Choose the personality of your block screen. This overlay appears whenever Opal protects you from distractions.
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {THEMES.map((theme) => {
              const isActive = activeTheme === theme.id;
              return (
                <Pressable
                  key={theme.id}
                  onPress={() => setActiveTheme(theme.id)}
                  className={`w-full bg-white rounded-[32px] p-6 mb-4 border ${
                    isActive ? "border-emerald-600" : "border-slate-50"
                  }`}
                >
                  <View className="flex-row items-center justify-between mb-4">
                    <View className={`w-14 h-14 rounded-2xl items-center justify-center ${
                      isActive ? "bg-emerald-50" : "bg-slate-50"
                    }`}>
                      <Text className="text-4xl">{theme.icon}</Text>
                    </View>
                    {isActive && (
                      <View className="bg-emerald-600 w-6 h-6 rounded-full items-center justify-center">
                        <Ionicons name="checkmark" size={16} color="white" />
                      </View>
                    )}
                  </View>
                  
                  <Text className={`text-xl font-bold mb-2 ${
                    isActive ? "text-emerald-700" : "text-slate-900"
                  }`}>
                    {theme.title}
                  </Text>
                  <Text className="text-slate-400 text-sm leading-5 font-medium">
                    {theme.description}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable 
            onPress={() => (ref as any)?.current?.dismiss()}
            className="bg-slate-950 w-full py-6 rounded-full items-center mt-4"
          >
            <Text className="text-white font-bold text-lg">Save Settings</Text>
          </Pressable>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  });

export default BlockScreenCustomizationSheet;
