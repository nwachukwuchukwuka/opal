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
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className="flex-1 px-8 pt-4">
          {/* Header */}
          <View className="mb-6">
            <View className="flex-row items-center mb-1.5">
              <TextInput
                value={name}
                onChangeText={setName}
                className="text-slate-900 text-3xl font-extrabold mr-2 p-0"
              />
              <Ionicons name="pencil" size={16} color="#94a3b8" />
            </View>
            <Text className="text-slate-500 text-sm font-medium leading-5">
              Set a limit on how many times you can open an app each day. The app starts locked, and you can unlock it with a tap.
            </Text>
          </View>

          {/* Apps Selection */}
          <Pressable
            onPress={onSelectApps}
            className="flex-row justify-between items-center bg-white rounded-[24px] px-5 py-5 mb-4 border border-slate-200"
          >
            <Text className="text-slate-900 text-base font-bold">
              Apps Locked
            </Text>
            <View className="flex-row items-center">
              <Text className="text-slate-400 font-bold mr-2">No Apps</Text>
              <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
            </View>
          </Pressable>

          {/* Configuration Card */}
          <View className="bg-white rounded-[32px] p-6 gap-6 mb-4 border border-slate-200">
            {/* Counter Control */}
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-slate-900 text-base font-bold">
                  Unlocks Allowed
                </Text>
                <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider">Per day</Text>
              </View>
              <View className="flex-row items-center gap-4">
                <Pressable
                  onPress={handleDecrement}
                  className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center border border-slate-100"
                >
                  <Ionicons name="remove" size={20} color="#0f172a" />
                </Pressable>
                <Text className="text-slate-900 text-xl font-extrabold w-6 text-center">
                  {unlocksAllowed}
                </Text>
                <Pressable
                  onPress={handleIncrement}
                  className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center border border-slate-100"
                >
                  <Ionicons name="add" size={20} color="#0f172a" />
                </Pressable>
              </View>
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-slate-50" />

            {/* Duration Selector */}
            <Pressable
              onPress={onSelectDuration}
              className="flex-row justify-between items-center"
            >
              <Text className="text-slate-900 text-base font-bold">
                For Up To
              </Text>
              <View className="flex-row items-center">
                <Text className="text-slate-400 font-bold mr-2">5 min</Text>
                <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
              </View>
            </Pressable>

            {/* Divider */}
            <View className="h-[1px] bg-slate-50" />

            {/* Difficulty Selector */}
            <Pressable
              onPress={onSelectDifficulty}
              className="flex-row justify-between items-center"
            >
              <Text className="text-slate-900 text-base font-bold">
                Difficulty
              </Text>
              <View className="flex-row items-center">
                <Text className="text-slate-400 font-bold mr-2">Can be reset</Text>
                <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
              </View>
            </Pressable>
          </View>

          {/* Days Selection */}
          <View className="bg-white rounded-[32px] p-6 mb-6 border border-slate-200">
            <Text className="text-slate-400 text-xs font-bold mb-4 uppercase tracking-wider">
              Days of week active
            </Text>
            <DayOfWeekSelector
              activeDays={activeDays}
              onToggleDay={handleToggleDay}
            />
          </View>

          {/* Save Button */}
          <View className="mt-auto pb-10">
            <Pressable
              onPress={onSave}
              className="w-full py-5 bg-emerald-600 border border-emerald-500 rounded-[28px] items-center justify-center shadow-lg shadow-emerald-900/10"
            >
              <Text className="text-white text-xl font-bold">Save Lock</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default AppLockSheet;
