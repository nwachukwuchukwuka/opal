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
      backgroundStyle={{ backgroundColor: "#f8fafc" }}
      handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
    >
      <BottomSheetView className="flex-1 px-5 pt-2">
        {/* Dynamic Header */}
        <View className="mb-6 bg-white border border-slate-200 rounded-[32px] p-5">
          <Text className="text-slate-900 text-2xl font-extrabold mb-1">App Lock</Text>

          <View className="flex-row items-center">
            <Ionicons
              name={isUnlocked ? "lock-open" : "lock-closed"}
              size={14}
              color={isUnlocked ? "#059669" : "#64748b"}
            />
            <Text className="text-slate-500 text-sm font-medium ml-1.5">
              {isUnlocked
                ? `Unlocked • Remaining: ${formatTime(remainingSeconds)}`
                : "Locked • 6/6 Unlocks left today"}
            </Text>
          </View>
        </View>

        {/* Dynamic Content */}
        {isUnlocked ? (
          <View className="mb-6 bg-white border border-slate-200 rounded-[24px] p-4">
            {/* Progress Bar Container */}
            <View className="h-4 bg-slate-50 rounded-full w-full overflow-hidden flex-row relative mb-2 border border-slate-100">
              {/* The Fill */}
              <View
                className="h-full bg-emerald-500/20"
                style={{ width: `${progressPercent}%` }}
              />
              {/* The Knob */}
              <View
                className="absolute h-full w-1 bg-emerald-600"
                style={{ left: `${progressPercent}%` }}
              />
              <View className="absolute inset-0 flex-row justify-between items-center px-1">
                {[...Array(10)].map((_, i) => (
                  <View key={i} className="w-[1px] h-2 bg-slate-200" />
                ))}
              </View>
            </View>

            {/* Time Labels */}
            <View className="flex-row justify-between">
              <Text className="text-slate-400 text-[10px] font-bold">Now</Text>
              <Text className="text-slate-400 text-[10px] font-bold">+5m</Text>
            </View>
          </View>
        ) : (
          <View className="mb-4" />
        )}

        {/* Actions */}
        <View className="gap-3 mt-auto pb-10">
          <Pressable
            onPress={isUnlocked ? onRelock : onUnlock}
            className="w-full py-5 bg-emerald-600 border border-emerald-500 rounded-[28px] items-center justify-center shadow-lg shadow-emerald-900/10"
          >
            <Text className="text-white text-lg font-bold">
              {isUnlocked ? "Relock these apps" : "Unlock for 5m"}
            </Text>
          </Pressable>

          <Pressable
            onPress={onEdit}
            className="w-full py-4 rounded-[24px] bg-white border border-slate-200 items-center justify-center"
          >
            <Text className="text-slate-700 text-base font-bold">
              Edit Lock
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default AppLockActionSheet;
