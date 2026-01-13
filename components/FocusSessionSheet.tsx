import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS, DIFFICULTY_LABELS, DIFFICULTY_WARNINGS } from "../constants";
import { DifficultyLevel, FocusSessionSheetProps } from "../types";
import DifficultySelector from "./DifficultySelector";
import DurationPicker from "./DurationPicker";
import SessionNameSheet from "./SessionNameSheet";

const FocusSessionSheet = forwardRef<BottomSheetModal, FocusSessionSheetProps>(
  ({ onStartSession, onClose }, ref) => {
    const [sessionName, setSessionName] = useState("Focus Session");
    const [duration, setDuration] = useState({ hours: 0, minutes: 20 });
    const [isAlwaysOn, setIsAlwaysOn] = useState(false);
    const [difficulty, setDifficulty] = useState<DifficultyLevel>("normal");

    const sessionNameRef = useRef<BottomSheetModal>(null);
    const difficultyRef = useRef<BottomSheetModal>(null);
    const durationRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ["65%"], []);

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

    const formatDuration = () => {
      if (isAlwaysOn) return "Always On";
      const totalMinutes = duration.hours * 60 + duration.minutes;
      if (duration.hours > 0) {
        return `${duration.hours}h ${duration.minutes}m`;
      }
      return `${totalMinutes}m`;
    };

    const handleDurationConfirm = (hours: number, minutes: number) => {
      setDuration({ hours, minutes });
      setIsAlwaysOn(false);
    };

    const handleAlwaysOn = () => {
      setIsAlwaysOn(true);
    };

    const handleStartSession = () => {
      const totalMinutes = isAlwaysOn ? -1 : duration.hours * 60 + duration.minutes;
      onStartSession({
        name: sessionName,
        duration: totalMinutes,
        difficulty,
        isAlwaysOn,
      });
    };

    const warningText = DIFFICULTY_WARNINGS[difficulty];

    return (
      <>
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: "#18181b" }}
          handleIndicatorStyle={{ backgroundColor: "#52525b" }}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          enableDynamicSizing={false}
        >
          <BottomSheetView className="flex-1 px-5">
            {/* Session Name */}
            <Pressable
              onPress={() => sessionNameRef.current?.present()}
              className="flex-row items-center mb-6"
            >
              <Text className="text-white text-xl font-semibold mr-2">
                {sessionName}
              </Text>
              <Ionicons name="checkmark" size={20} color={COLORS.zinc500} />
            </Pressable>

            {/* Duration Row */}
            <Pressable
              onPress={() => durationRef.current?.present()}
              className="flex-row items-center justify-between py-4 border-b border-zinc-800"
            >
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={20} color={COLORS.zinc400} style={{ marginRight: 12 }} />
                <Text className="text-white text-base">Duration</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-zinc-400 text-base mr-2">{formatDuration()}</Text>
                <Ionicons name="chevron-forward" size={18} color={COLORS.zinc600} />
              </View>
            </Pressable>

            {/* Apps Blocked Row */}
            <Pressable className="flex-row items-center justify-between py-4 border-b border-zinc-800">
              <View className="flex-row items-center">
                <View className="w-5 h-5 rounded-full border-2 border-zinc-400 items-center justify-center mr-3">
                  <View className="w-2 h-2 rounded-full bg-zinc-400" />
                </View>
                <Text className="text-white text-base">Apps Blocked</Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-row items-center bg-zinc-800 rounded-full px-3 py-1">
                  <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                  <Text className="text-zinc-300 text-sm">Block List</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.zinc600} style={{ marginLeft: 8 }} />
              </View>
            </Pressable>

            {/* Difficulty Row */}
            <Pressable
              onPress={() => difficultyRef.current?.present()}
              className="flex-row items-center justify-between py-4 border-b border-zinc-800"
            >
              <View className="flex-row items-center">
                <Ionicons name="speedometer-outline" size={20} color={COLORS.zinc400} style={{ marginRight: 12 }} />
                <Text className="text-white text-base">Difficulty</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-zinc-400 text-base mr-2">{DIFFICULTY_LABELS[difficulty]}</Text>
                <Ionicons name="chevron-forward" size={18} color={COLORS.zinc600} />
              </View>
            </Pressable>

            {/* Warning Text */}
            {warningText && (
              <View className="flex-row items-start py-4">
                <Ionicons 
                  name="alert-circle-outline" 
                  size={18} 
                  color={difficulty === "timeout" ? "#f97316" : "#22c55e"} 
                  style={{ marginRight: 8, marginTop: 2 }} 
                />
                <Text 
                  className="text-sm flex-1 leading-5"
                  style={{ color: difficulty === "timeout" ? "#f97316" : "#22c55e" }}
                >
                  {warningText}
                </Text>
              </View>
            )}

            {/* Schedule for Later */}
            <Pressable className="flex-row items-center justify-between py-4 border-b border-zinc-800">
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={20} color={COLORS.zinc400} style={{ marginRight: 12 }} />
                <Text className="text-white text-base">Schedule for later</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.zinc600} />
            </Pressable>

            {/* Start Session Button */}
            <View className="mt-6 pb-4">
              <Pressable
                onPress={handleStartSession}
                className="w-full py-4 rounded-full items-center justify-center"
                style={{ backgroundColor: "#06b6d4" }}
              >
                <Text className="text-black text-lg font-semibold">Start Session</Text>
              </Pressable>
            </View>
          </BottomSheetView>
        </BottomSheetModal>

        {/* Duration Picker */}
        <DurationPicker
          ref={durationRef}
          initialHours={duration.hours}
          initialMinutes={duration.minutes}
          onConfirm={handleDurationConfirm}
          onAlwaysOn={handleAlwaysOn}
          onClose={() => durationRef.current?.dismiss()}
        />

        {/* Difficulty Selector */}
        <DifficultySelector
          ref={difficultyRef}
          selectedDifficulty={difficulty}
          onSelect={setDifficulty}
          onClose={() => difficultyRef.current?.dismiss()}
        />

        {/* Session Name Sheet */}
        <SessionNameSheet
          ref={sessionNameRef}
          initialName={sessionName}
          onConfirm={setSessionName}
          onClose={() => sessionNameRef.current?.dismiss()}
        />
      </>
    );
  }
);

FocusSessionSheet.displayName = "FocusSessionSheet";

export default FocusSessionSheet;

