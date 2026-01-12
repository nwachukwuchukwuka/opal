import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";

export type BlockScreenCustomizationSheetRef = BottomSheetModal;

const THEMES = [
  {
    id: "default",
    title: "Default",
    description: "This App is Blocked by Opal.",
    icon: "⚪",
  },
  {
    id: "pop",
    title: "Pop Culture",
    description:
      "Find funny pop culture references when you open a distracting app.",
    icon: "🍿",
  },
  {
    id: "haiku",
    title: "Focus Haiku",
    description:
      "Find little pieces of wisdom every time you open a distracting app.",
    icon: "🪶",
  },
  {
    id: "luminaries",
    title: "Luminaries",
    description:
      "Discover inspiration quotes from influential thinkers to help you accomplish your potential.",
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
          opacity={0.8}
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
        backgroundStyle={{ backgroundColor: "#121214" }}
        handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          <Text className="text-white text-xl font-bold mb-2 text-center">
            Customize Block Screen
          </Text>
          <Text className="text-zinc-400 text-center text-sm px-4 mb-8">
            Customize the block screen overlay that appears when you block an
            app with Opal.
          </Text>

          <View className="gap-3">
            {THEMES.map((theme) => (
              <Pressable
                key={theme.id}
                onPress={() => setActiveTheme(theme.id)}
                className="bg-zinc-900 rounded-2xl p-4 flex-row items-center justify-between"
              >
                <View className="flex-row items-center flex-1 mr-4">
                  <View className="w-10 h-10 items-center justify-center mr-3">
                    <Text className="text-3xl">{theme.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-base mb-1">
                      {theme.title}
                    </Text>
                    <Text className="text-zinc-500 text-xs leading-4">
                      {theme.description}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={activeTheme === theme.id}
                  onValueChange={() => setActiveTheme(theme.id)}
                  trackColor={{ false: "#3f3f46", true: "#3b82f6" }}
                  thumbColor={"#f4f4f5"}
                />
              </Pressable>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  });

export default BlockScreenCustomizationSheet;
