import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

export type AppLockActionSheetRef = BottomSheetModal;

interface AppLockActionSheetProps {
  isUnlocked: boolean;
  remainingSeconds: number;
  onUnlock: () => void;
  onRelock: () => void;
  onEdit: () => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const AppLockActionSheet = forwardRef<
  AppLockActionSheetRef,
  AppLockActionSheetProps
>(({ isUnlocked, remainingSeconds, onUnlock, onRelock, onEdit }, ref) => {
  const snapPoints = useMemo(() => ["40%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
      />
    ),
    []
  );

  const totalSeconds = 300;
  const progressPercent = (remainingSeconds / totalSeconds) * 100;

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: "#18181b" }}
      handleIndicatorStyle={{ backgroundColor: "#52525b" }}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
    >
      <BottomSheetView className="flex-1 px-5 pt-2">
        {/* Dynamic Header */}
        <View className="mb-6">
          <Text className="text-white text-xl font-bold mb-2">App Lock</Text>

          <View className="flex-row items-center">
            <Ionicons
              name={isUnlocked ? "lock-open" : "lock-closed"}
              size={14}
              color={isUnlocked ? "#a1a1aa" : "#71717a"}
            />
            <Text className="text-zinc-400 text-sm ml-1.5">
              {isUnlocked
                ? `Unlocked • Remaining: ${formatTime(remainingSeconds)}`
                : "Locked • 6/6 Unlocks left today"}
            </Text>
          </View>
        </View>

        {/* Dynamic Content */}
        {isUnlocked ? (
          <View className="mb-6">
            {/* Progress Bar Container */}
            <View className="h-4 bg-zinc-800 rounded-full w-full overflow-hidden flex-row relative mb-1">
              {/* The Fill */}
              <View
                className="h-full bg-teal-400/50"
                style={{ width: `${progressPercent}%` }}
              />
              {/* The Knob */}
              <View
                className="absolute h-full w-1 bg-white"
                style={{ left: `${progressPercent}%` }}
              />
              <View className="absolute inset-0 flex-row justify-between items-center px-1">
                {[...Array(10)].map((_, i) => (
                  <View key={i} className="w-[1px] h-2 bg-zinc-700" />
                ))}
              </View>
            </View>

            {/* Time Labels */}
            <View className="flex-row justify-between">
              <Text className="text-zinc-500 text-[10px] font-bold">Now</Text>
              <Text className="text-zinc-500 text-[10px] font-bold">+5m</Text>
            </View>
          </View>
        ) : (
          <View className="mb-4" />
        )}

        {/* Actions */}
        <View className="gap-3 mt-auto mb-4">
          <Pressable
            onPress={isUnlocked ? onRelock : onUnlock}
            style={{ borderRadius: 9999, overflow: "hidden", width: "100%" }}
          >
            <LinearGradient
              style={{
                width: "100%",
                paddingVertical: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
              colors={
                isUnlocked ? ["#86efac", "#22d3ee"] : ["#bbf7d0", "#a5f3fc"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="text-black text-base font-bold">
                {isUnlocked ? "Relock these apps" : "Unlock for 5m"}
              </Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={onEdit}
            className="w-full py-4 rounded-full bg-zinc-800 items-center justify-center"
          >
            <Text className="text-white text-base font-semibold">
              Edit Lock
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default AppLockActionSheet;
