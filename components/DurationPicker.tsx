import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { DurationPickerProps } from "../types";

const DurationPicker = forwardRef<BottomSheetModal, DurationPickerProps>(
  ({ initialHours, initialMinutes, onConfirm, onAlwaysOn, onClose }, ref) => {
    // Create a date object representing the duration
    const initialDate = new Date();
    initialDate.setHours(initialHours, initialMinutes, 0, 0);
    
    const [duration, setDuration] = useState(initialDate);

    const snapPoints = useMemo(() => ["55%"], []);

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

    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate) {
        setDuration(selectedDate);
      }
    };

    const handleConfirm = () => {
      const hours = duration.getHours();
      const minutes = duration.getMinutes();
      onConfirm(hours, minutes);
      onClose();
    };

    const handleAlwaysOn = () => {
      onAlwaysOn();
      onClose();
    };

    // Get the timer value in seconds for countdown mode (iOS)
    const getTimerDurationSeconds = () => {
      return initialHours * 3600 + initialMinutes * 60;
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
      >
        <BottomSheetView className="flex-1 px-5">
          {/* Title */}
          <View className="items-center mb-4">
            <Text className="text-white text-xl font-semibold">Duration</Text>
            <Text className="text-zinc-500 text-sm mt-2">
              Select how long this event should last.
            </Text>
          </View>

          {/* DateTimePicker */}
          <View className="items-center py-4">
            {Platform.OS === "ios" ? (
              <DateTimePicker
                value={duration}
                mode="countdown"
                display="spinner"
                onChange={handleChange}
                minuteInterval={1}
                textColor="#ffffff"
                themeVariant="dark"
                style={{ width: 300, height: 180 }}
              />
            ) : (
              <DateTimePicker
                value={duration}
                mode="time"
                display="spinner"
                onChange={handleChange}
                is24Hour={true}
                textColor="#ffffff"
                style={{ width: 300, height: 180 }}
              />
            )}
          </View>

          {/* Display selected duration */}
          <View className="items-center mb-4">
            <Text className="text-zinc-400 text-base">
              {duration.getHours()} hours {duration.getMinutes()} minutes
            </Text>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3 mt-2">
            <Pressable
              onPress={handleAlwaysOn}
              className="flex-1 py-4 rounded-full bg-zinc-800 active:bg-zinc-700"
            >
              <Text className="text-white text-center text-base font-semibold">
                Always On
              </Text>
            </Pressable>
            <Pressable
              onPress={handleConfirm}
              className="flex-1 py-4 rounded-full"
              style={{ backgroundColor: "#06b6d4" }}
            >
              <Text className="text-black text-center text-base font-semibold">
                Confirm
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

DurationPicker.displayName = "DurationPicker";

export default DurationPicker;
