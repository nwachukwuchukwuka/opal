import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
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

interface SettingRowProps {
  label: string;
  value: string;
  onPress?: () => void;
}

const SettingRow = ({ label, value, onPress }: SettingRowProps) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center justify-between py-4 border-b border-zinc-800"
    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
  >
    <Text className="text-white text-base">{label}</Text>
    <View className="flex-row items-center">
      <Text className="text-zinc-400 text-base mr-2">{value}</Text>
      <Ionicons name="chevron-forward" size={16} color="#71717a" />
    </View>
  </Pressable>
);

const formatTimeLimit = (
  hours: number,
  minutes: number,
  days: number[]
): string => {
  const timePart = hours > 0 ? `${hours}h` : `${minutes}m`;
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (days.length === 7) {
    return `${timePart} • Every day`;
  } else if (
    days.length === 5 &&
    [1, 2, 3, 4, 5].every((d) => days.includes(d))
  ) {
    return `${timePart} • Weekdays`;
  } else if (days.length === 2 && [0, 6].every((d) => days.includes(d))) {
    return `${timePart} • Weekends`;
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
    const [name, setName] = useState("My App Limit");
    const [timeLimit, setTimeLimit] = useState({
      hours: 1,
      minutes: 0,
      days: [1, 2, 3, 4, 5],
    });
    const [selectedApps, setSelectedApps] = useState<string[]>([]);
    const [blockUntil, setBlockUntil] = useState("Until tomorrow");
    const [difficulty, setDifficulty] = useState("Normal");

    const timeLimitSheetRef = useRef<TimeLimitSheetRef>(null);
    const snapPoints = useMemo(() => ["70%"], []);

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

    return (
      <>
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#18181b" }}
          handleIndicatorStyle={{ backgroundColor: "#52525b" }}
          backdropComponent={renderBackdrop}
          enableDynamicSizing={false}
        >
          <BottomSheetView className="flex-1 px-5">
            {/* Title with Edit Icon */}
            <View className="flex-row items-center mb-2">
              <TextInput
                value={name}
                onChangeText={setName}
                className="text-white text-2xl font-bold flex-1"
                placeholderTextColor="#71717a"
              />
              <Ionicons name="pencil" size={16} color="#71717a" />
            </View>

            {/* Description */}
            <Text className="text-zinc-400 text-sm mb-6">
              Set a daily time limit for an app. After reaching the limit, the
              app will be blocked.
            </Text>

            {/* When I... Section */}
            <Text className="text-zinc-500 text-sm mb-2">When I...</Text>
            <View className="bg-zinc-800/50 rounded-xl mb-4">
              <SettingRow
                label="Reach Time Limit"
                value={formatTimeLimit(
                  timeLimit.hours,
                  timeLimit.minutes,
                  timeLimit.days
                )}
                onPress={() => timeLimitSheetRef.current?.present()}
              />
              <Pressable
                className="flex-row items-center justify-between py-4 px-0"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Text className="text-white text-base">On these apps</Text>
                <View className="flex-row items-center">
                  <Text className="text-zinc-400 text-base mr-2">
                    {selectedApps.length > 0
                      ? `${selectedApps.length} Apps`
                      : "No Apps"}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#71717a" />
                </View>
              </Pressable>
            </View>

            {/* Then... Section */}
            <Text className="text-zinc-500 text-sm mb-2">Then...</Text>
            <View className="bg-zinc-800/50 rounded-xl mb-6">
              <SettingRow
                label="Block Apps"
                value={blockUntil}
                onPress={() => {}}
              />
              <Pressable
                className="flex-row items-center justify-between py-4"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Text className="text-white text-base">Difficulty</Text>
                <View className="flex-row items-center">
                  <Text className="text-zinc-400 text-base mr-2">
                    {difficulty}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#71717a" />
                </View>
              </Pressable>
            </View>

            {/* Save Button */}
            <Pressable
              onPress={handleSave}
              className="rounded-full py-4 items-center justify-center overflow-hidden"
              style={{
                backgroundColor: "#22d3ee",
              }}
            >
              <Text className="text-black font-bold text-base">Save</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheetModal>

        {/* Nested Time Limit Sheet */}
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
