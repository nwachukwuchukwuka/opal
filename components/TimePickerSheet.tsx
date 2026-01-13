import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
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
    const snapPoints = useMemo(() => ["55%"], []);

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
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 items-center px-6">
          <Text className="text-white text-2xl font-bold mt-2">{title}</Text>
          <Text className="text-zinc-400 text-base mt-1 mb-6">
            Select a time for this event.
          </Text>
          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => setTime(selectedDate || time)}
            themeVariant="dark"
          />
          <View className="w-full mt-auto pb-6 pt-6">
            <Pressable
              onPress={handleDone}
              style={{
                borderRadius: 9999,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <LinearGradient
                colors={["#86efac", "#22d3ee"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: "100%",
                  paddingVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text className="text-black text-lg font-bold">Done</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default TimePickerSheet;
