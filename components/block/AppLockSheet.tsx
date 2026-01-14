import { DayOfWeekSelector } from "@/components/DayOfWeekSelector";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
export type AppLockSheetRef = BottomSheetModal;

interface AppLockSheetProps {
  onSave: () => void;
  onSelectApps: () => void;
  onSelectDuration: () => void;
  onSelectDifficulty: () => void;
}

const AppLockSheet = forwardRef<AppLockSheetRef, AppLockSheetProps>(
  ({ onSave, onSelectApps, onSelectDuration, onSelectDifficulty }, ref) => {
    // --- STATE ---
    const [name, setName] = useState("App Lock");
    const [unlocksAllowed, setUnlocksAllowed] = useState(5);
    const [activeDays, setActiveDays] = useState([1, 2, 3, 4, 5]);

    const snapPoints = useMemo(() => ["85%"], []);

    const handleIncrement = () => setUnlocksAllowed((prev) => prev + 1);
    const handleDecrement = () =>
      setUnlocksAllowed((prev) => (prev > 1 ? prev - 1 : 1));

    const handleToggleDay = (dayId: number) => {
      setActiveDays((prev) =>
        prev.includes(dayId)
          ? prev.filter((d) => d !== dayId)
          : [...prev, dayId]
      );
    };

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

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className="flex-1 px-5 pt-2">
          {/* Header */}
          <View className="flex-row items-center mb-2">
            <TextInput
              value={name}
              onChangeText={setName}
              className="text-white text-2xl font-bold mr-2"
            />
            <Ionicons name="pencil" size={16} color="#71717a" />
          </View>
          <Text className="text-zinc-400 text-sm leading-5 mb-6">
            Set a limit on how many times you can open an{"\n"}
            app each day. The app starts locked, and you{"\n"}
            can unlock it with a tap.
          </Text>

          {/* Apps Selection */}
          <Pressable
            onPress={onSelectApps}
            className="flex-row justify-between items-center bg-zinc-800 rounded-xl px-4 py-4 mb-4"
          >
            <Text className="text-white text-base font-medium">
              Apps Locked
            </Text>
            <View className="flex-row items-center">
              <Text className="text-zinc-500 mr-2">No Apps</Text>
              <Ionicons name="chevron-forward" size={18} color="#71717a" />
            </View>
          </Pressable>

          {/* Configuration Card */}
          <View className="bg-zinc-800 rounded-xl p-4 gap-6 mb-4">
            {/* Counter Control */}
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white text-base font-medium">
                  Unlocks Allowed
                </Text>
                <Text className="text-zinc-500 text-xs">Per day</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Pressable
                  onPress={handleDecrement}
                  className="w-8 h-8 rounded-full bg-zinc-700 items-center justify-center border border-zinc-600"
                >
                  <Ionicons name="remove" size={20} color="white" />
                </Pressable>
                <Text className="text-white text-lg font-bold w-6 text-center">
                  {unlocksAllowed}
                </Text>
                <Pressable
                  onPress={handleIncrement}
                  className="w-8 h-8 rounded-full bg-zinc-700 items-center justify-center border border-zinc-600"
                >
                  <Ionicons name="add" size={20} color="white" />
                </Pressable>
              </View>
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-zinc-700" />

            {/* Duration Selector */}
            <Pressable
              onPress={onSelectDuration}
              className="flex-row justify-between items-center"
            >
              <Text className="text-white text-base font-medium">
                For Up To
              </Text>
              <View className="flex-row items-center">
                <Text className="text-zinc-500 mr-2">5 min</Text>
                <Ionicons name="chevron-forward" size={18} color="#71717a" />
              </View>
            </Pressable>

            {/* Divider */}
            <View className="h-[1px] bg-zinc-700" />

            {/* Difficulty Selector */}
            <Pressable
              onPress={onSelectDifficulty}
              className="flex-row justify-between items-center"
            >
              <Text className="text-white text-base font-medium">
                Difficulty
              </Text>
              <View className="flex-row items-center">
                <Text className="text-zinc-500 mr-2">Can be reset</Text>
                <Ionicons name="chevron-forward" size={18} color="#71717a" />
              </View>
            </Pressable>
          </View>

          {/* Days Selection */}
          <View className="bg-zinc-800 rounded-xl p-4 mb-6">
            <Text className="text-zinc-400 text-xs font-bold mb-4 uppercase">
              Days of week active
            </Text>
            <DayOfWeekSelector
              activeDays={activeDays}
              onToggleDay={handleToggleDay}
            />
          </View>

          {/* Save Button */}
          <View className="mt-auto pb-6">
            <Pressable
              onPress={onSave}
              className="w-full py-4 rounded-full items-center justify-center overflow-hidden"
              style={{ backgroundColor: "#bbf7d0" }}
            >
              <View className="absolute inset-0 bg-white/20" />
              <Text className="text-black text-lg font-bold">Save</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default AppLockSheet;
