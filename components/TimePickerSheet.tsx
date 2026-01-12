import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
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
    const snapPoints = useMemo(() => ["45%"], []);

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
        backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />}
      >
        <BottomSheetView className="flex-1 items-center px-6">
          <Text className="text-white text-2xl font-bold mt-2">{title}</Text>
          <Text className="text-zinc-400 text-base mt-1 mb-6">Select a time for this event.</Text>
          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => setTime(selectedDate || time)}
            themeVariant="dark"
          />
          <View className="w-full mt-auto pb-6">
            <Pressable onPress={handleDone} className="w-full py-4 rounded-full bg-gradient-to-r from-green-300 to-cyan-400 items-center">
              <Text className="text-black text-lg font-bold">Done</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default TimePickerSheet;