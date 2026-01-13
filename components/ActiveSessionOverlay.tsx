import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, Modal, Pressable, Text, View } from "react-native";
import { COLORS, DIFFICULTY_LABELS } from "../constants";
import { ActiveSessionProps, SessionConfig } from "../types";
import EditSessionSheet, { EditSessionSheetRef } from "./EditSessionSheet";
import SnoozeSheet from "./SnoozeSheet";
import BlockListSheet, { BlockListSheetRef } from "./blocklist/BlockListSheet";

const initialSessionData: SessionConfig = {
  id: "work1",
  name: "Work Time",
  icon: "💻",
  isEnabled: true,
  startTime: new Date(new Date().setHours(10, 0, 0, 0)),
  endTime: new Date(new Date().setHours(12, 0, 0, 0)),
  activeDays: [1, 2, 3, 4, 5],
  appsBlockedId: "list1",
  difficulty: "normal",
};

export default function ActiveSessionOverlay({
  visible,
  sessionName,
  duration,
  difficulty,
  onSnooze,
  onLeaveEarly,
  onEdit,
  onClose,
}: ActiveSessionProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(duration * 60);
  const [startTime] = useState(new Date());
  const [progress, setProgress] = useState(0);

  const router = useRouter();

  const [sessionConfig, setSessionConfig] = useState(initialSessionData);
  const editSessionRef = useRef<EditSessionSheetRef>(null);
  const blockListSheetRef = useRef<BlockListSheetRef>(null);

  // Snooze state
  const [isSnoozing, setIsSnoozing] = useState(false);
  const [snoozeRemainingSeconds, setSnoozeRemainingSeconds] = useState(0);
  const [snoozeStartTime, setSnoozeStartTime] = useState<Date | null>(null);
  const [snoozeTotalSeconds, setSnoozeTotalSeconds] = useState(0);
  const snoozeSheetRef = useRef<BottomSheet>(null);

  const totalSeconds = duration * 60;
  const isAlwaysOn = duration === -1;

  // Session countdown
  useEffect(() => {
    if (!visible || isAlwaysOn || isSnoozing) return;

    setRemainingSeconds(duration * 60);

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          router.push("/Home/session-feedback-screen");
          return 0;
        }

        const newValue = prev - 1;
        setProgress(((totalSeconds - newValue) / totalSeconds) * 100);
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, duration, isAlwaysOn, isSnoozing]);

  // Snooze countdown
  useEffect(() => {
    if (!isSnoozing || snoozeRemainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setSnoozeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSnoozing(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSnoozing, snoozeRemainingSeconds]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getEndTime = () => {
    const endDate = new Date(startTime.getTime() + duration * 60 * 1000);
    return endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStartTimeFormatted = () => {
    return startTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getSnoozeEndTime = () => {
    if (!snoozeStartTime) return "";
    const endDate = new Date(
      snoozeStartTime.getTime() + snoozeTotalSeconds * 1000
    );
    return endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleOpenEditSheet = () => {
    editSessionRef.current?.present();
  };

  const handleSaveSession = (newConfig: SessionConfig) => {
    console.log("Saving new config:", newConfig);
    setSessionConfig(newConfig);
    editSessionRef.current?.dismiss();
  };

  const handleCancelSession = () => {
    console.log("Session edit canceled!");
    editSessionRef.current?.dismiss();
  };

  const getSnoozeStartFormatted = () => {
    if (!snoozeStartTime) return "";
    return snoozeStartTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSnoozePress = () => {
    snoozeSheetRef.current?.expand();
  };

  const handleSnoozeConfirm = (minutes: number) => {
    const seconds = minutes * 60;
    setSnoozeRemainingSeconds(seconds);
    setSnoozeTotalSeconds(seconds);
    setSnoozeStartTime(new Date());
    setIsSnoozing(true);
    onSnooze();
  };

  const handleOpenBlockListSheet = () => {
    blockListSheetRef.current?.present();
  };

  const handleEndSnooze = () => {
    setIsSnoozing(false);
    setSnoozeRemainingSeconds(0);
  };

  const canSnooze = difficulty !== "deep-focus";
  const canLeaveEarly = difficulty !== "deep-focus";

  const snoozeProgress =
    snoozeTotalSeconds > 0
      ? ((snoozeTotalSeconds - snoozeRemainingSeconds) / snoozeTotalSeconds) *
        100
      : 0;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-black">
          {/* Background Image */}
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            }}
            className="flex-1"
            resizeMode="cover"
          >
            {/* Overlay gradient */}
            <View className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <View className="flex-1 pt-14">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-8 px-5">
                {/* Close/Minimize button */}
                <Pressable
                  onPress={onClose}
                  className="w-8 h-8 rounded-full bg-zinc-800/80 items-center justify-center"
                >
                  <Ionicons
                    name="chevron-down"
                    size={20}
                    color={COLORS.zinc300}
                  />
                </Pressable>

                {/* Help button */}
                <Pressable className="w-8 h-8 rounded-full bg-zinc-800/80 items-center justify-center">
                  <Ionicons name="help" size={18} color={COLORS.zinc300} />
                </Pressable>
              </View>

              {/* Spacer */}
              <View className="flex-1" />

              {/* <Pressable onPress={handleOpenEditSheet} className=" py-1 rounded-3xl bg-white/50  ">
                <Text className="text-white text-sm mr-2">Edit session</Text>
              </Pressable> */}
              {!isSnoozing && (
                <Pressable
                  onPress={handleOpenEditSheet}
                  className="self-end py-1 px-3 rounded-3xl bg-white/20 mb-3 mr-4"
                >
                  <Text className="text-white text-xs font-medium">
                    Edit session
                  </Text>
                </Pressable>
              )}
              {isSnoozing ? (
                <View className="px-5 mb-6">
                  <Text className="text-white text-2xl font-bold mb-2">
                    Snooze
                  </Text>

                  <View className="flex-row items-center mb-4">
                    <Text className="text-zinc-200 text-sm mr-2">Snoozing</Text>
                    <Text className="text-white text-md">
                      {formatTime(snoozeRemainingSeconds)}
                    </Text>
                  </View>

                  <View className="mb-4">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="w-4 h-4 rounded-sm bg-cyan-500 items-center justify-center"
                        style={{
                          marginLeft: `${snoozeProgress}%`,
                          transform: [{ translateX: -8 }],
                        }}
                      >
                        <Ionicons
                          name="diamond"
                          size={10}
                          color={COLORS.white}
                        />
                      </View>
                    </View>

                    <View className="h-1.5 bg-zinc-400 rounded-full overflow-hidden flex-row">
                      <View
                        className="h-full bg-cyan-500"
                        style={{ width: `${snoozeProgress}%` }}
                      />
                    </View>

                    <View className="flex-row justify-between mt-2">
                      <Text className="text-zinc-200 text-xs">
                        {getSnoozeStartFormatted()}
                      </Text>
                      <Text className="text-zinc-200 text-xs">
                        {getSnoozeEndTime()}
                      </Text>
                    </View>
                  </View>

                  {/* End Snooze Button */}
                  <Pressable
                    onPress={handleEndSnooze}
                    className="w-full py-4 rounded-full items-center justify-center"
                    style={{ backgroundColor: "#3f3f46" }}
                  >
                    <Text className="text-white text-lg font-semibold">
                      End snooze
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <View className="bg-black/0 px-5 mb-6">
                  {/* Session Name */}
                  <Text className="text-white text-2xl font-bold mb-2">
                    {sessionName}
                  </Text>

                  {/* Remaining Time */}
                  <View className="flex-row items-center mb-4">
                    <Text className="text-zinc-200 text-sm mr-2">
                      Remaining time:
                    </Text>
                    <Text className="text-white text-lg font-semibold">
                      {isAlwaysOn ? "Always On" : formatTime(remainingSeconds)}
                    </Text>
                  </View>

                  {/* Progress Bar */}
                  {!isAlwaysOn && (
                    <View className="mb-4">
                      <View className="h-2 bg-zinc-500 rounded-full overflow-hidden">
                        <View
                          className="h-full rounded-full"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: "#06b6d4",
                          }}
                        />
                      </View>
                      {/* Time labels */}
                      <View className="flex-row justify-between mt-2">
                        <Text className="text-zinc-200 text-xs">
                          {getStartTimeFormatted()}
                        </Text>
                        <Text className="text-zinc-200 text-xs">
                          {getEndTime()}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Badges Row */}
                  {/* <View className="flex-row gap-3 mb-4">
                    <Pressable onPress={handleOpenBlockListSheet}>
                      <View className="flex-row items-center bg-zinc-800 rounded-lg px-3 py-2">
                        <View>
                          <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                          <Text className="text-zinc-200 text-sm mr-2">
                            Block List
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Ionicons
                            name="apps"
                            size={12}
                            color={COLORS.zinc400}
                          />
                          <Text className="text-zinc-200 text-xs ml-1">3</Text>
                          <Ionicons
                            name="folder"
                            size={12}
                            color={COLORS.zinc400}
                            style={{ marginLeft: 8 }}
                          />
                          <Text className="text-zinc-200 text-xs ml-1">2</Text>
                        </View>
                      </View>
                    </Pressable>
                    <View className="flex-row items-center bg-zinc-800 rounded-lg px-3 py-2">
                      <Text className="text-zinc-500 text-xs mr-2">
                        DIFFICULTY
                      </Text>
                      <Text className="text-zinc-300 text-sm">
                        {DIFFICULTY_LABELS[difficulty]}
                      </Text>
                    </View>
                  </View> */}
                  <View className="flex-row gap-3 mb-4">
                    {/* Block List Badge */}
                    <Pressable
                      onPress={handleOpenBlockListSheet}
                      className="w-[50%]"
                    >
                      <View className="border border-zinc-300 rounded-xl px-4 py-3 justify-center flex-row items-center justify-between">
                        {/* Label Row */}
                        <View className="">
                          <View className="flex-row items-center mb-1">
                            <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                            <Text className="text-zinc-400 text-xs font-bold uppercase">
                              Block List
                            </Text>
                          </View>

                          {/* Content Row */}
                          <View className="flex-row items-center">
                            <Ionicons
                              name="apps"
                              size={14}
                              color={COLORS.zinc400}
                            />
                            <Text className="text-white text-sm font-semibold ml-1.5">
                              3
                            </Text>
                            <Ionicons
                              name="folder"
                              size={14}
                              color={COLORS.zinc400}
                              style={{ marginLeft: 12 }}
                            />
                            <Text className="text-white text-sm font-semibold ml-1.5">
                              2
                            </Text>
                          </View>
                        </View>

                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color={COLORS.zinc400}
                        />
                      </View>
                    </Pressable>

                    {/* Difficulty Badge */}
                    <View className="flex-1 border border-zinc-300 rounded-xl px-4 py-3 justify-center flex-row items-center justify-between">
                      {/* Label Row */}
                      <View className="">
                        <Text className="text-zinc-400 text-xs font-bold uppercase mb-1">
                          Difficulty
                        </Text>

                        {/* Content Row */}
                        <View className="flex-row items-center">
                          <Ionicons
                            name="planet-outline"
                            size={14}
                            color={COLORS.white}
                            style={{ marginRight: 6 }}
                          />
                          <Text className="text-white text-sm font-semibold">
                            {DIFFICULTY_LABELS[difficulty]}
                          </Text>
                        </View>
                      </View>

                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={COLORS.zinc400}
                      />
                    </View>
                  </View>

                  {/* Action Buttons */}
                  {canSnooze && (
                    <Pressable
                      onPress={handleSnoozePress}
                      className="w-full py-4 rounded-full mb-3 items-center justify-center overflow-hidden"
                      style={{ backgroundColor: "#06b6d4" }}
                    >
                      <Text className="text-black text-lg font-semibold">
                        Snooze
                      </Text>
                    </Pressable>
                  )}

                  {canLeaveEarly && (
                    <Pressable onPress={onLeaveEarly} className="py-2">
                      <Text className="text-red-400 text-center text-base">
                        Leave Early
                      </Text>
                    </Pressable>
                  )}

                  {difficulty === "deep-focus" && (
                    <Text className="text-zinc-500 text-center text-sm">
                      Deep Focus mode - cannot snooze or leave early
                    </Text>
                  )}
                </View>
              )}
            </View>
          </ImageBackground>

          {/* Snooze Sheet */}
          <SnoozeSheet
            ref={snoozeSheetRef}
            onSnooze={handleSnoozeConfirm}
            onClose={() => snoozeSheetRef.current?.close()}
          />

          <EditSessionSheet
            ref={editSessionRef}
            initialConfig={sessionConfig}
            onSave={handleSaveSession}
            onCancelSession={handleCancelSession}
          />

          <BlockListSheet ref={blockListSheetRef} />
        </View>
      </BottomSheetModalProvider>
    </Modal>
  );
}
