import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { DurationPickerProps } from "../types";

const DurationPicker = forwardRef<BottomSheetModal, DurationPickerProps>(
  ({ initialHours, initialMinutes, onConfirm, onAlwaysOn, onClose }, ref) => {
    const initialDate = new Date();
    initialDate.setHours(initialHours, initialMinutes, 0, 0);

    const [duration, setDuration] = useState(initialDate);

    // Bumped to 65% to beautifully accommodate the new chunky padded layout
    const snapPoints = useMemo(() => ["65%"], []);

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
        backgroundStyle={{ backgroundColor: "#f8fafc" }} // Slate 50
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }} // Slate 300
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 px-6 pt-2">

          {/* Header */}
          <View className="items-center mb-6">
            <Text className="text-slate-900 text-2xl font-extrabold">Duration</Text>
            <Text className="text-slate-500 text-sm font-medium mt-1.5">
              Select how long this event should last
            </Text>
          </View>

          {/* DateTimePicker Card Container */}
          <View className="bg-white border-2 border-slate-100 rounded-[36px] items-center py-6 mb-4">
            {Platform.OS === "ios" ? (
              <DateTimePicker
                value={duration}
                mode="countdown"
                display="spinner"
                onChange={handleChange}
                minuteInterval={1}
                textColor="#0f172a" // Slate 900
                themeVariant="light"
                style={{ width: 300, height: 180 }}
              />
            ) : (
              <DateTimePicker
                value={duration}
                mode="time"
                display="spinner"
                onChange={handleChange}
                is24Hour={true}
                textColor="#0f172a"
                style={{ width: 300, height: 180 }}
              />
            )}
          </View>

          {/* Display Selected Duration Summary */}
          <View className="bg-emerald-50 border border-emerald-100 py-3 rounded-2xl items-center mb-6 mx-4">
            <Text className="text-emerald-700 text-sm font-bold">
              Target length: {duration.getHours()} hours {duration.getMinutes()} minutes
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-4 mt-auto pb-8">
            <Pressable
              onPress={handleAlwaysOn}
              className="flex-1 py-4 rounded-[24px] bg-slate-100 border border-slate-200 items-center justify-center"
            >
              <Text className="text-slate-700 text-base font-bold">
                Always On
              </Text>
            </Pressable>

            <Pressable
              onPress={handleConfirm}
              className="flex-1 py-4 rounded-[24px] bg-emerald-600 border border-emerald-500 items-center justify-center"
            >
              <Text className="text-white text-base font-bold">
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