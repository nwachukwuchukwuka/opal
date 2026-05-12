import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import { addDays, format } from "date-fns";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { SessionConfig } from "../types";
import DisableDurationSheet, {
  DisableDurationSheetRef,
} from "./DisableDurationSheet";
import EmojiPickerSheet, { EmojiPickerSheetRef } from "./EmojiPickerSheet";
import TimePickerSheet, { TimePickerSheetRef } from "./TimePickerSheet";

export type EditSessionSheetRef = BottomSheetModal;

interface EditSessionSheetProps {
  initialConfig: SessionConfig;
  onSave: (config: SessionConfig) => void;
  onCancelSession: () => void;
}

const EditSessionSheet = forwardRef<EditSessionSheetRef, EditSessionSheetProps>(
  ({ initialConfig, onSave, onCancelSession }, ref) => {
    const [config, setConfig] = useState(initialConfig);
    const [editingTimeField, setEditingTimeField] = useState<
      "startTime" | "endTime" | null
    >(null);

    const timePickerRef = useRef<TimePickerSheetRef>(null);
    const emojiPickerRef = useRef<EmojiPickerSheetRef>(null);
    const disableDurationSheetRef = useRef<DisableDurationSheetRef>(null);

    const snapPoints = useMemo(() => ["85%"], []);

    const handleOpenEmojiPicker = () => emojiPickerRef.current?.present();
    const handleOpenTimePicker = (field: "startTime" | "endTime") => {
      setEditingTimeField(field);
      timePickerRef.current?.present();
    };

    useEffect(() => {
      setConfig(initialConfig);
    }, [initialConfig]);

    const handleTimeSelected = (time: Date) => {
      if (editingTimeField) {
        setConfig((prev) => ({ ...prev, [editingTimeField]: time }));
      }
    };

    const handleEmojiSelected = (emoji: string) =>
      setConfig((prev) => ({ ...prev, icon: emoji }));

    const handleToggleDay = (dayId: number) => {
      setConfig((prev) => {
        const activeDays = prev.activeDays.includes(dayId)
          ? prev.activeDays.filter((d) => d !== dayId)
          : [...prev.activeDays, dayId];
        return { ...prev, activeDays };
      });
    };

    const handleSwitchToggle = (isEnabled: boolean) => {
      if (isEnabled) {
        setConfig((prev) => ({ ...prev, isEnabled, disabledUntil: undefined }));
      } else {
        disableDurationSheetRef.current?.present();
      }
    };

    const handleDisableForDays = (days: number) => {
      const newConfig = {
        ...config,
        isEnabled: false,
        disabledUntil: addDays(new Date(), days),
      };
      onSave(newConfig);
      disableDurationSheetRef.current?.dismiss();
    };

    const handleDisableIndefinitely = () => {
      const newConfig: SessionConfig = {
        ...config,
        isEnabled: false,
        disabledUntil: "indefinitely",
      };
      onSave(newConfig);
      disableDurationSheetRef.current?.dismiss();
    };

    // --- CUSTOM INLINE COMPONENTS ---

    const SectionRow = ({ icon, label, value, valueColor, onPress, isLast }: any) => (
      <Pressable
        onPress={onPress}
        className={`flex-row items-center justify-between py-4 ${!isLast ? "border-b border-slate-50" : ""}`}
      >
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
            <Ionicons name={icon} size={18} color="#0f172a" />
          </View>
          <Text className="text-slate-900 text-base font-semibold ml-3">{label}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-slate-500 text-sm font-bold mr-2" style={valueColor ? { color: valueColor } : {}}>
            {value}
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
        </View>
      </Pressable>
    );

    const DaySelector = () => {
      const days = [
        { id: 1, label: "M" },
        { id: 2, label: "T" },
        { id: 3, label: "W" },
        { id: 4, label: "T" },
        { id: 5, label: "F" },
        { id: 6, label: "S" },
        { id: 0, label: "S" },
      ];
      return (
        <View className="flex-row justify-between items-center px-2">
          {days.map((day, index) => {
            const isActive = config.activeDays.includes(day.id);
            return (
              <Pressable
                key={`${day.id}-${index}`}
                onPress={() => handleToggleDay(day.id)}
                className={`w-10 h-10 rounded-full items-center justify-center border ${isActive ? "bg-emerald-600 border-emerald-600" : "bg-white border-slate-100"
                  }`}
              >
                <Text className={`font-bold text-sm ${isActive ? "text-white" : "text-slate-300"}`}>
                  {day.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      );
    };

    return (
      <>
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#f8fafc" }}
          handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              opacity={0.5}
            />
          )}
          enableDynamicSizing={false}
          stackBehavior={"push"}
        >
          <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }} className="px-6 pt-6">

            {/* Header Card */}
            <View className="bg-white rounded-[40px] p-8 mb-6 border border-slate-100 shadow-sm shadow-slate-900/5">
              <View className="flex-row items-center justify-between mb-6">
                <Pressable
                  onPress={handleOpenEmojiPicker}
                  className="w-20 h-20 bg-slate-50 rounded-[28px] items-center justify-center border border-slate-100"
                >
                  <Text className="text-4xl">{config.icon}</Text>
                  <View className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 border border-slate-100">
                    <Ionicons name="pencil" size={14} color="#0f172a" />
                  </View>
                </Pressable>

                <Switch
                  value={config.isEnabled}
                  onValueChange={handleSwitchToggle}
                  trackColor={{ false: "#e2e8f0", true: "#10b981" }}
                  thumbColor="#ffffff"
                />
              </View>

              <TextInput
                value={config.name}
                onChangeText={(name) =>
                  setConfig((prev) => ({ ...prev, name }))
                }
                placeholder="Session Name"
                placeholderTextColor="#94a3b8"
                className="text-slate-900 text-2xl font-bold p-0"
                style={{ textAlignVertical: "center" }}
              />
              <Text className="text-slate-400 font-bold text-xs mt-3">Rename your session</Text>
            </View>

            {/* Config Section */}
            <View className="mb-8">
              <Text className="text-slate-900 text-xl font-bold mb-4 ml-2">Session Details</Text>
              <View className="bg-white rounded-[32px] p-6 border border-slate-100">
                <SectionRow
                  icon="shield-checkmark"
                  label="Apps Blocked"
                  value="Block List"
                  valueColor="#059669"
                  onPress={() => { }}
                />
                <SectionRow
                  icon="flash"
                  label="Difficulty"
                  value="Normal"
                  onPress={() => { }}
                  isLast={true}
                />
              </View>
              <Text className="text-slate-400 text-xs font-medium ml-4 mt-3">
                You can snooze and cancel this session when active
              </Text>
            </View>

            {/* Time Section */}
            <View className="mb-8">
              <Text className="text-slate-900 text-xl font-bold mb-4 ml-2">Set Schedule</Text>
              <View className="bg-white rounded-[32px] p-6 border border-slate-100">
                <View className="flex-row gap-4">
                  <Pressable
                    onPress={() => handleOpenTimePicker("startTime")}
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-3xl p-5 items-center"
                  >
                    <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-2">Starts At</Text>
                    <Text className="text-slate-900 text-2xl font-bold">
                      {format(config.startTime, "p")}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleOpenTimePicker("endTime")}
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-3xl p-5 items-center"
                  >
                    <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-2">Ends At</Text>
                    <Text className="text-slate-900 text-2xl font-bold">
                      {format(config.endTime, "p")}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Repeat Section */}
            <View className="mb-10">
              <Text className="text-slate-900 text-xl font-bold mb-4 ml-2">Days Active</Text>
              <View className="bg-white rounded-[32px] p-6 border border-slate-100">
                <DaySelector />
              </View>
            </View>

            {/* Actions */}
            <View className="pb-10 gap-4">
              <Pressable
                onPress={() => onSave(config)}
                className="bg-emerald-600 border border-emerald-500 rounded-[28px] py-5 items-center justify-center shadow-lg shadow-emerald-900/10"
              >
                <Text className="text-white text-xl font-bold">Save Changes</Text>
              </Pressable>

              <Pressable
                onPress={onCancelSession}
                className="items-center py-2"
              >
                <Text className="text-slate-400 font-bold text-base">Cancel Session</Text>
              </Pressable>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>

        {/* Nested Sheets */}
        <TimePickerSheet
          ref={timePickerRef}
          title={`select ${editingTimeField === "startTime" ? "start" : "end"} time`}
          initialTime={editingTimeField ? config[editingTimeField] : new Date()}
          onTimeSelect={handleTimeSelected}
        />
        <EmojiPickerSheet
          ref={emojiPickerRef}
          initialEmoji={config.icon}
          onEmojiSelect={handleEmojiSelected}
        />
        <DisableDurationSheet
          ref={disableDurationSheetRef}
          onDisableForDays={handleDisableForDays}
          onDisableIndefinitely={handleDisableIndefinitely}
        />
      </>
    );
  }
);

export default EditSessionSheet;
