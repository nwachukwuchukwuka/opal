import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
  
  export type TimeLimitSheetRef = BottomSheetModal;
  
  interface TimeLimitSheetProps {
    initialHours?: number;
    initialMinutes?: number;
    initialDays?: number[];
    onDone: (hours: number, minutes: number, days: number[]) => void;
  }
  
  const HOURS = Array.from({ length: 24 }, (_, i) => i);
  const MINUTES = Array.from({ length: 60 }, (_, i) => i);
  const DAYS = [
    { id: 1, label: "M" },
    { id: 2, label: "T" },
    { id: 3, label: "W" },
    { id: 4, label: "T" },
    { id: 5, label: "F" },
    { id: 6, label: "S" },
    { id: 0, label: "S" },
  ];
  
  const ITEM_HEIGHT = 40;
  const VISIBLE_ITEMS = 3;
  const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
  
  interface WheelPickerProps {
    data: number[];
    value: number;
    onChange: (value: number) => void;
    label: string;
  }
  
  const WheelPicker = ({ data, value, onChange, label }: WheelPickerProps) => {
    const scrollViewRef = React.useRef<ScrollView>(null);
  
    React.useEffect(() => {
      const index = data.indexOf(value);
      if (index >= 0 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
      }
    }, []);
  
    const handleMomentumScrollEnd = (event: any) => {
      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / ITEM_HEIGHT);
      if (data[index] !== undefined) {
        onChange(data[index]);
      }
    };
  
    return (
      <View className="flex-1 items-center">
        <View style={{ height: PICKER_HEIGHT }} className="w-full relative">
          {/* Selection indicator */}
          <View
            className="absolute left-0 right-0 bg-zinc-800 rounded-xl"
            style={{
              top: ITEM_HEIGHT,
              height: ITEM_HEIGHT,
            }}
          />
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onMomentumScrollEnd={handleMomentumScrollEnd}
            contentContainerStyle={{
              paddingVertical: ITEM_HEIGHT,
            }}
          >
            {data.map((item) => (
              <View
                key={item}
                style={{ height: ITEM_HEIGHT }}
                className="items-center justify-center"
              >
                <Text
                  className={`text-2xl font-semibold ${
                    item === value ? "text-white" : "text-zinc-600"
                  }`}
                >
                  {item}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <Text className="text-zinc-400 text-sm mt-1">{label}</Text>
      </View>
    );
  };
  
  const TimeLimitSheet = forwardRef<TimeLimitSheetRef, TimeLimitSheetProps>(
    ({ initialHours = 1, initialMinutes = 0, initialDays = [1, 2, 3, 4, 5], onDone }, ref) => {
      const [hours, setHours] = useState(initialHours);
      const [minutes, setMinutes] = useState(initialMinutes);
      const [selectedDays, setSelectedDays] = useState<number[]>(initialDays);
  
      const snapPoints = useMemo(() => ["55%"], []);
  
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
  
      const toggleDay = (dayId: number) => {
        setSelectedDays((prev) =>
          prev.includes(dayId)
            ? prev.filter((d) => d !== dayId)
            : [...prev, dayId]
        );
      };
  
      const handleDone = () => {
        // Ensure minimum 15 minutes
        const totalMinutes = hours * 60 + minutes;
        if (totalMinutes < 15) {
          onDone(0, 15, selectedDays);
        } else {
          onDone(hours, minutes, selectedDays);
        }
      };
  
      const isMinimumMet = hours * 60 + minutes >= 15;
  
      return (
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#18181b" }}
          handleIndicatorStyle={{ backgroundColor: "#52525b" }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView className="flex-1 px-5">
            {/* Title */}
            <Text className="text-white text-2xl font-bold mb-1">Time Limit</Text>
            <Text className="text-zinc-400 text-base mb-1">
              Choose the amount of time you'd like to use these apps before they are blocked.
            </Text>
            <Text className="text-yellow-400 text-sm mb-6">Minimum 15 minutes</Text>
  
            {/* Time Picker */}
            <View className="flex-row items-center mb-8">
              <WheelPicker
                data={HOURS}
                value={hours}
                onChange={setHours}
                label="hour"
              />
              <WheelPicker
                data={MINUTES}
                value={minutes}
                onChange={setMinutes}
                label="minutes"
              />
            </View>
  
            {/* Days Selector */}
            <Text className="text-zinc-400 text-base mb-3">On these days:</Text>
            <View className="flex-row justify-between mb-8">
              {DAYS.map((day, index) => {
                const isSelected = selectedDays.includes(day.id);
                return (
                  <Pressable
                    key={`${day.id}-${index}`}
                    onPress={() => toggleDay(day.id)}
                    className={`w-10 h-10 rounded-full items-center justify-center ${
                      isSelected ? "bg-zinc-600" : "bg-zinc-800"
                    }`}
                  >
                    <Text
                      className={`font-semibold ${
                        isSelected ? "text-white" : "text-zinc-500"
                      }`}
                    >
                      {day.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
  
            {/* Done Button */}
            <Pressable
              onPress={handleDone}
              className="rounded-full py-4 items-center justify-center overflow-hidden"
              style={{
                backgroundColor: "#22d3ee",
              }}
            >
              <View
                className="absolute right-0 top-0 bottom-0 w-1/3"
                style={{
                  backgroundColor: "rgba(163, 230, 53, 0.4)",
                }}
              />
              <Text className="text-black font-bold text-base">Done</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheetModal>
      );
    }
  );
  
  export default TimeLimitSheet;