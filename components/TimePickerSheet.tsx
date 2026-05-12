import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { forwardRef, useMemo, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

export type TimePickerSheetRef = BottomSheetModal;

interface TimePickerSheetProps {
  title: string;
  initialTime: Date;
  onTimeSelect: (date: Date) => void;
}

const TimePickerSheet = forwardRef<TimePickerSheetRef, TimePickerSheetProps>(
  ({ title, initialTime, onTimeSelect }, ref) => {
    const [time, setTime] = useState(initialTime);
    const snapPoints = useMemo(() => ["65%"], []);

    const handleDone = () => {
      onTimeSelect(time);
      if (ref && "current" in ref) {
        ref.current?.dismiss();
      }
    };

    return (
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
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 24, paddingTop: 16 }}
        >
          <View className="items-center">
            <Text className="text-slate-900 text-3xl font-black mb-1">
              {title}
            </Text>
            <Text className="text-slate-400 font-bold text-sm mb-8">
              Select a time for this event
            </Text>

            <View className="w-full bg-white rounded-[32px] p-6 border border-slate-100 items-center justify-center shadow-sm shadow-slate-900/5">
              <DateTimePicker
                value={time}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => setTime(selectedDate || time)}
                themeVariant="light"
                textColor="#0f172a"
              />
            </View>

            <View className="w-full mt-10">
              <Pressable
                onPress={handleDone}
                className="bg-emerald-600 border border-emerald-500 rounded-[28px] py-5 items-center justify-center shadow-lg shadow-emerald-900/10"
              >
                <Text className="text-white text-xl font-bold">Done</Text>
              </Pressable>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default TimePickerSheet;
