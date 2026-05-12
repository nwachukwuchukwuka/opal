import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import TimeLimitSheet, { TimeLimitSheetRef } from "./Timelimitsheet";

export type AppLimitSheetRef = BottomSheetModal;

interface AppLimitSheetProps {
  onSave: (config: AppLimitConfig) => void;
}

export interface AppLimitConfig {
  name: string;
  timeLimit: { hours: number; minutes: number; days: number[] };
  apps: string[];
  blockUntil: string;
  difficulty: string;
}

const formatTimeLimit = (
  hours: number,
  minutes: number,
  days: number[]
): string => {
  const timePart = hours > 0 ? `${hours}h` : `${minutes}m`;
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  if (days.length === 7) {
    return `${timePart} • every day`;
  } else if (
    days.length === 5 &&
    [1, 2, 3, 4, 5].every((d) => days.includes(d))
  ) {
    return `${timePart} • weekdays`;
  } else if (days.length === 2 && [0, 6].every((d) => days.includes(d))) {
    return `${timePart} • weekends`;
  } else {
    const dayLabels = days
      .sort()
      .map((d) => dayNames[d].charAt(0))
      .join("");
    return `${timePart} • ${dayLabels}`;
  }
};

const AppLimitSheet = forwardRef<AppLimitSheetRef, AppLimitSheetProps>(
  ({ onSave }, ref) => {
    const [name, setName] = useState("my app limit");
    const [timeLimit, setTimeLimit] = useState({
      hours: 1,
      minutes: 0,
      days: [1, 2, 3, 4, 5],
    });
    const [selectedApps, setSelectedApps] = useState<string[]>([]);
    const [blockUntil, setBlockUntil] = useState("until tomorrow");
    const [difficulty, setDifficulty] = useState("normal");

    const timeLimitSheetRef = useRef<TimeLimitSheetRef>(null);
    const snapPoints = useMemo(() => ["80%"], []);

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

    const handleTimeLimitDone = (
      hours: number,
      minutes: number,
      days: number[]
    ) => {
      setTimeLimit({ hours, minutes, days });
      timeLimitSheetRef.current?.dismiss();
    };

    const handleSave = () => {
      onSave({
        name,
        timeLimit,
        apps: selectedApps,
        blockUntil,
        difficulty,
      });
    };

    const SettingCard = ({ icon, label, value, onPress, bgColor = "#ffffff" }: any) => (
      <Pressable
        onPress={onPress}
        className="w-[48%] aspect-square p-4 rounded-[32px] items-center justify-center border border-slate-200 mb-4"
        style={{ backgroundColor: bgColor }}
      >
        <View className="w-10 h-10 bg-emerald-50 rounded-2xl items-center justify-center mb-3 border border-emerald-100">
          <Ionicons name={icon} size={20} color="#059669" />
        </View>
        <Text className="text-slate-500 text-[10px] text-center font-bold uppercase tracking-wider mb-1">{label}</Text>
        <Text className="text-slate-900 text-xs font-bold text-center" numberOfLines={2}>
          {value}
        </Text>
      </Pressable>
    );

    return (
      <>
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#f8fafc" }}
          handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
          backdropComponent={renderBackdrop}
          enableDynamicSizing={false}
          stackBehavior={"push"}
        >
          <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }} className="px-6 pt-6">

            <View className="bg-white rounded-[32px] p-6 mb-6 border border-slate-200">
              <View className="flex-row items-center mb-4">
                <View className="w-12 h-12 bg-emerald-50 rounded-xl items-center justify-center mr-4 border border-emerald-100">
                  <Ionicons name="hourglass-outline" size={24} color="#059669" />
                </View>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  className="text-slate-900 text-2xl font-extrabold flex-1 p-0"
                  placeholderTextColor="#94a3b8"
                />
                <Ionicons name="pencil" size={14} color="#94a3b8" />
              </View>
              <Text className="text-slate-500 text-xs font-medium leading-4">
                Set a daily time limit for an app. After reaching the limit, the app will be blocked.
              </Text>
            </View>

            {/* Bento Grid Settings */}
            <View className="flex-row flex-wrap justify-between">
              <SettingCard
                icon="time-outline"
                label="time limit"
                value={formatTimeLimit(
                  timeLimit.hours,
                  timeLimit.minutes,
                  timeLimit.days
                )}
                onPress={() => timeLimitSheetRef.current?.present()}
              />
              <SettingCard
                icon="apps-outline"
                label="selected apps"
                value={selectedApps.length > 0 ? `${selectedApps.length} apps` : "no apps"}
                onPress={() => { }}
              />
              <SettingCard
                icon="calendar-outline"
                label="block until"
                value={blockUntil}
                onPress={() => { }}
              />
              <SettingCard
                icon="flash-outline"
                label="difficulty"
                value={difficulty}
                onPress={() => { }}
              />
            </View>

            <View className="bg-white rounded-3xl p-4 mb-8 border border-slate-200">
              <Text className="text-slate-500 text-[10px] text-center font-medium italic">
                Once you reach your limit, apps stay blocked until the reset time.
              </Text>
            </View>

            {/* Actions */}
            <View className="pb-10 gap-4">
              <Pressable
                onPress={handleSave}
                className="bg-emerald-600 rounded-[28px] border border-emerald-500"
                style={{
                  paddingVertical: 18,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text className="text-white text-lg font-bold">Save Changes</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  if (ref && 'current' in ref) {
                    ref.current?.dismiss();
                  }
                }}
                className="items-center py-2"
              >
                <Text className="text-slate-400 text-base font-bold">Cancel</Text>
              </Pressable>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>

        <TimeLimitSheet
          ref={timeLimitSheetRef}
          initialHours={timeLimit.hours}
          initialMinutes={timeLimit.minutes}
          initialDays={timeLimit.days}
          onDone={handleTimeLimitDone}
        />
      </>
    );
  }
);

export default AppLimitSheet;
