import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { DIFFICULTY_LABELS, DIFFICULTY_WARNINGS } from "../constants";
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

    // Slightly increased to 75% to beautifully accommodate the new chunky grid layout
    const snapPoints = useMemo(() => ["75%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ), []
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
          backgroundStyle={{ backgroundColor: "#f8fafc" }} // Slate 50
          handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }} // Slate 300
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          enableDynamicSizing={false}
        >
          <BottomSheetView className="flex-1 px-5 pt-2">

            {/* Redesigned Header: Prominent Editable Title Card */}
            <Pressable
              onPress={() => sessionNameRef.current?.present()}
              className="bg-white border-2 border-emerald-100 rounded-[36px] p-6 mb-4 flex-row justify-between items-center"
            >
              <View className="flex-1 pr-4">
                <Text className="text-emerald-700 text-sm font-bold mb-1">
                  Session Name
                </Text>
                <Text className="text-slate-900 text-2xl font-extrabold" numberOfLines={1}>
                  {sessionName}
                </Text>
              </View>
              <View className="w-12 h-12 bg-emerald-50 rounded-full items-center justify-center border border-emerald-100">
                <Ionicons name="pencil" size={20} color="#059669" />
              </View>
            </Pressable>

            {/* Bento Grid: Duration & Difficulty side-by-side */}
            <View className="flex-row gap-3 mb-3">
              {/* Duration Card */}
              <Pressable
                onPress={() => durationRef.current?.present()}
                className="flex-1 bg-white border border-slate-200 rounded-[32px] p-5"
              >
                <View className="w-10 h-10 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 mb-4">
                  <Ionicons name="time" size={20} color="#059669" />
                </View>
                <Text className="text-slate-400 text-xs font-bold mb-1">Duration</Text>
                <Text className="text-slate-900 text-lg font-bold">{formatDuration()}</Text>
              </Pressable>

              {/* Difficulty Card */}
              <Pressable
                onPress={() => difficultyRef.current?.present()}
                className="flex-1 bg-white border border-slate-200 rounded-[32px] p-5"
              >
                <View className="w-10 h-10 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 mb-4">
                  <Ionicons name="flame" size={20} color="#059669" />
                </View>
                <Text className="text-slate-400 text-xs font-bold mb-1">Difficulty</Text>
                <Text className="text-slate-900 text-lg font-bold">{DIFFICULTY_LABELS[difficulty]}</Text>
              </Pressable>
            </View>

            {/* Apps Blocked Row Container */}
            <Pressable className="bg-white border border-slate-200 rounded-[28px] p-5 mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-emerald-50 rounded-2xl items-center justify-center border border-emerald-100 mr-4">
                  <Ionicons name="shield-checkmark" size={20} color="#059669" />
                </View>
                <Text className="text-slate-900 text-base font-bold">Apps Blocked</Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 mr-2">
                  <View className="w-2 h-2 rounded-full bg-rose-500 mr-2" />
                  <Text className="text-slate-600 text-xs font-bold">Block list</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
              </View>
            </Pressable>

            {/* Schedule Row Container */}
            <Pressable className="bg-white border border-slate-200 rounded-[28px] p-5 mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 mr-4">
                  <Ionicons name="calendar" size={20} color="#64748b" />
                </View>
                <Text className="text-slate-900 text-base font-bold">Schedule for later</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
            </Pressable>

            {/* Dynamic Warning Text Box */}
            {warningText && (
              <View
                className={`p-4 rounded-2xl flex-row items-start mb-2 border ${difficulty === "timeout"
                  ? "bg-amber-50 border-amber-200"
                  : "bg-emerald-50 border-emerald-200"
                  }`}
              >
                <Ionicons
                  name="information-circle"
                  size={20}
                  color={difficulty === "timeout" ? "#d97706" : "#059669"}
                  style={{ marginRight: 10, marginTop: 2 }}
                />
                <Text
                  className={`text-sm flex-1 font-medium leading-5 ${difficulty === "timeout" ? "text-amber-800" : "text-emerald-800"
                    }`}
                >
                  {warningText}
                </Text>
              </View>
            )}

            <View className="flex-1" />

            {/* Start Session Button */}
            <View className="pb-8 pt-4">
              <Pressable
                onPress={handleStartSession}
                className="w-full bg-emerald-600 py-4 rounded-[24px] items-center justify-center border border-emerald-500"
              >
                <Text className="text-white text-lg font-bold">Start Session</Text>
              </Pressable>
            </View>
          </BottomSheetView>
        </BottomSheetModal>

        <DurationPicker
          ref={durationRef}
          initialHours={duration.hours}
          initialMinutes={duration.minutes}
          onConfirm={handleDurationConfirm}
          onAlwaysOn={handleAlwaysOn}
          onClose={() => durationRef.current?.dismiss()}
        />

        <DifficultySelector
          ref={difficultyRef}
          selectedDifficulty={difficulty}
          onSelect={setDifficulty}
          onClose={() => difficultyRef.current?.dismiss()}
        />

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
