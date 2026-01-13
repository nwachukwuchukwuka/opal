// import {
//     BottomSheetBackdrop,
//     BottomSheetModal,
//     BottomSheetView,
// } from "@gorhom/bottom-sheet";
// import React, { forwardRef, useCallback, useMemo, useState } from "react";
// import { Pressable, ScrollView, Text, View } from "react-native";

//   export type TimeLimitSheetRef = BottomSheetModal;

//   interface TimeLimitSheetProps {
//     initialHours?: number;
//     initialMinutes?: number;
//     initialDays?: number[];
//     onDone: (hours: number, minutes: number, days: number[]) => void;
//   }

//   const HOURS = Array.from({ length: 24 }, (_, i) => i);
//   const MINUTES = Array.from({ length: 60 }, (_, i) => i);
//   const DAYS = [
//     { id: 1, label: "M" },
//     { id: 2, label: "T" },
//     { id: 3, label: "W" },
//     { id: 4, label: "T" },
//     { id: 5, label: "F" },
//     { id: 6, label: "S" },
//     { id: 0, label: "S" },
//   ];

//   const ITEM_HEIGHT = 40;
//   const VISIBLE_ITEMS = 3;
//   const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

//   interface WheelPickerProps {
//     data: number[];
//     value: number;
//     onChange: (value: number) => void;
//     label: string;
//   }

//   const WheelPicker = ({ data, value, onChange, label }: WheelPickerProps) => {
//     const scrollViewRef = React.useRef<ScrollView>(null);

//     React.useEffect(() => {
//       const index = data.indexOf(value);
//       if (index >= 0 && scrollViewRef.current) {
//         scrollViewRef.current.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
//       }
//     }, []);

//     const handleMomentumScrollEnd = (event: any) => {
//       const y = event.nativeEvent.contentOffset.y;
//       const index = Math.round(y / ITEM_HEIGHT);
//       if (data[index] !== undefined) {
//         onChange(data[index]);
//       }
//     };

//     return (
//       <View className="flex-1 items-center">
//         <View style={{ height: PICKER_HEIGHT }} className="w-full relative">
//           {/* Selection indicator */}
//           <View
//             className="absolute left-0 right-0 bg-zinc-800 rounded-xl"
//             style={{
//               top: ITEM_HEIGHT,
//               height: ITEM_HEIGHT,
//             }}
//           />
//           <ScrollView
//             ref={scrollViewRef}
//             showsVerticalScrollIndicator={false}
//             snapToInterval={ITEM_HEIGHT}
//             decelerationRate="fast"
//             onMomentumScrollEnd={handleMomentumScrollEnd}
//             contentContainerStyle={{
//               paddingVertical: ITEM_HEIGHT,
//             }}
//           >
//             {data.map((item) => (
//               <View
//                 key={item}
//                 style={{ height: ITEM_HEIGHT }}
//                 className="items-center justify-center"
//               >
//                 <Text
//                   className={`text-2xl font-semibold ${
//                     item === value ? "text-white" : "text-zinc-600"
//                   }`}
//                 >
//                   {item}
//                 </Text>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//         <Text className="text-zinc-400 text-sm mt-1">{label}</Text>
//       </View>
//     );
//   };

//   const TimeLimitSheet = forwardRef<TimeLimitSheetRef, TimeLimitSheetProps>(
//     ({ initialHours = 1, initialMinutes = 0, initialDays = [1, 2, 3, 4, 5], onDone }, ref) => {
//       const [hours, setHours] = useState(initialHours);
//       const [minutes, setMinutes] = useState(initialMinutes);
//       const [selectedDays, setSelectedDays] = useState<number[]>(initialDays);

//       const snapPoints = useMemo(() => ["55%"], []);

//       const renderBackdrop = useCallback(
//         (props: any) => (
//           <BottomSheetBackdrop
//             {...props}
//             disappearsOnIndex={-1}
//             appearsOnIndex={0}
//             opacity={0.7}
//           />
//         ),
//         []
//       );

//       const toggleDay = (dayId: number) => {
//         setSelectedDays((prev) =>
//           prev.includes(dayId)
//             ? prev.filter((d) => d !== dayId)
//             : [...prev, dayId]
//         );
//       };

//       const handleDone = () => {
//         // Ensure minimum 15 minutes
//         const totalMinutes = hours * 60 + minutes;
//         if (totalMinutes < 15) {
//           onDone(0, 15, selectedDays);
//         } else {
//           onDone(hours, minutes, selectedDays);
//         }
//       };

//       const isMinimumMet = hours * 60 + minutes >= 15;

//       return (
//         <BottomSheetModal
//           ref={ref}
//           snapPoints={snapPoints}
//           backgroundStyle={{ backgroundColor: "#18181b" }}
//           handleIndicatorStyle={{ backgroundColor: "#52525b" }}
//           backdropComponent={renderBackdrop}
//         >
//           <BottomSheetView className="flex-1 px-5">
//             {/* Title */}
//             <Text className="text-white text-2xl font-bold mb-1">Time Limit</Text>
//             <Text className="text-zinc-400 text-base mb-1">
//               Choose the amount of time you'd like to use these apps before they are blocked.
//             </Text>
//             <Text className="text-yellow-400 text-sm mb-6">Minimum 15 minutes</Text>

//             {/* Time Picker */}
//             <View className="flex-row items-center mb-8">
//               <WheelPicker
//                 data={HOURS}
//                 value={hours}
//                 onChange={setHours}
//                 label="hour"
//               />
//               <WheelPicker
//                 data={MINUTES}
//                 value={minutes}
//                 onChange={setMinutes}
//                 label="minutes"
//               />
//             </View>

//             {/* Days Selector */}
//             <Text className="text-zinc-400 text-base mb-3">On these days:</Text>
//             <View className="flex-row justify-between mb-8">
//               {DAYS.map((day, index) => {
//                 const isSelected = selectedDays.includes(day.id);
//                 return (
//                   <Pressable
//                     key={`${day.id}-${index}`}
//                     onPress={() => toggleDay(day.id)}
//                     className={`w-10 h-10 rounded-full items-center justify-center ${
//                       isSelected ? "bg-zinc-600" : "bg-zinc-800"
//                     }`}
//                   >
//                     <Text
//                       className={`font-semibold ${
//                         isSelected ? "text-white" : "text-zinc-500"
//                       }`}
//                     >
//                       {day.label}
//                     </Text>
//                   </Pressable>
//                 );
//               })}
//             </View>

//             {/* Done Button */}
//             <Pressable
//               onPress={handleDone}
//               className="rounded-full py-4 items-center justify-center overflow-hidden"
//               style={{
//                 backgroundColor: "#22d3ee",
//               }}
//             >
//               <View
//                 className="absolute right-0 top-0 bottom-0 w-1/3"
//                 style={{
//                   backgroundColor: "rgba(163, 230, 53, 0.4)",
//                 }}
//               />
//               <Text className="text-black font-bold text-base">Done</Text>
//             </Pressable>
//           </BottomSheetView>
//         </BottomSheetModal>
//       );
//     }
//   );

//   export default TimeLimitSheet;

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

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
const PICKER_HEIGHT = 160; // 4 items visible context

// --- Helper: Wheel Picker ---
const WheelPicker = ({
  items,
  value,
  onValueChange,
  align = "center",
}: {
  items: number[];
  value: number;
  onValueChange: (value: number) => void;
  align?: "left" | "right" | "center";
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollIndex, setScrollIndex] = useState(items.indexOf(value));

  // Update selection while scrolling for immediate feedback
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    setScrollIndex(index);
  };

  // Snap to item when scrolling ends
  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const safeIndex = Math.max(0, Math.min(index, items.length - 1));

    setScrollIndex(safeIndex);
    if (items[safeIndex] !== undefined) {
      onValueChange(items[safeIndex]);
    }
  };

  const paddingVertical = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;

  return (
    <View style={{ height: PICKER_HEIGHT, flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{ paddingVertical }}
        onLayout={() => {
          const index = items.indexOf(value);
          if (index > -1 && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              y: index * ITEM_HEIGHT,
              animated: false,
            });
          }
        }}
      >
        {items.map((item, index) => {
          const isSelected = index === scrollIndex;
          return (
            <View
              key={item}
              style={{ height: ITEM_HEIGHT }}
              className={`justify-center ${align === "right" ? "items-end pr-2" : "items-end pr-2"}`}
            >
              <Text
                className={`text-2xl ${
                  isSelected
                    ? "text-white font-medium"
                    : "text-zinc-600 font-normal"
                }`}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const TimeLimitSheet = forwardRef<TimeLimitSheetRef, TimeLimitSheetProps>(
  (
    {
      initialHours = 1,
      initialMinutes = 0,
      initialDays = [1, 2, 3, 4, 5],
      onDone,
    },
    ref
  ) => {
    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [selectedDays, setSelectedDays] = useState<number[]>(initialDays);

    const snapPoints = useMemo(() => ["65%"], []);

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
      const totalMinutes = hours * 60 + minutes;
      if (totalMinutes < 15) {
        onDone(0, 15, selectedDays); // Enforce minimum
      } else {
        onDone(hours, minutes, selectedDays);
      }
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 px-5">
          {/* Title Section */}
          <Text className="text-white text-2xl font-bold mb-1">Time Limit</Text>
          <Text className="text-zinc-400 text-sm mb-1">
            Choose the amount of time you'd like to use these apps before they
            are blocked.
          </Text>
          <Text className="text-yellow-500 text-xs mb-4">
            Minimum 15 minutes
          </Text>

          {/* --- CUSTOM PICKER CONTAINER --- */}
          <View className="bg-zinc-900 rounded-2xl mb-6 overflow-hidden relative">
            <View
              className="flex-row justify-center items-center px-8"
              style={{ height: PICKER_HEIGHT }}
            >
              {/* The Grey Highlight Bar (Behind everything) */}
              <View
                className="absolute left-4 right-4 bg-zinc-700/50 rounded-lg pointer-events-none"
                style={{
                  height: ITEM_HEIGHT,
                  top: (PICKER_HEIGHT - ITEM_HEIGHT) / 2,
                }}
              />

              {/* Hours Column */}
              <View
                className="flex-row items-center justify-end flex-1"
                style={{ marginRight: -10 }}
              >
                <View style={{ width: 50 }}>
                  <WheelPicker
                    items={HOURS}
                    value={hours}
                    onValueChange={setHours}
                    align="right"
                  />
                </View>
                <Text className="text-white text-base font-medium ml-2 mb-1">
                  hour
                </Text>
              </View>

              {/* Spacer */}
              <View style={{ width: 40 }} />

              {/* Minutes Column */}
              <View
                className="flex-row items-center justify-start flex-1"
                style={{ marginLeft: -10 }}
              >
                <View style={{ width: 50 }}>
                  <WheelPicker
                    items={MINUTES}
                    value={minutes}
                    onValueChange={setMinutes}
                    align="right"
                  />
                </View>
                <Text className="text-white text-base font-medium ml-2 mb-1">
                  minutes
                </Text>
              </View>
            </View>
          </View>

          {/* Days Selector */}
          <Text className="text-zinc-400 text-sm mb-3 font-bold uppercase">
            On these days:
          </Text>
          <View className="flex-row justify-between mb-8 px-2">
            {DAYS.map((day, index) => {
              const isSelected = selectedDays.includes(day.id);
              return (
                <Pressable
                  key={`${day.id}-${index}`}
                  onPress={() => toggleDay(day.id)}
                  className={`w-9 h-9 rounded-full items-center justify-center ${
                    isSelected ? "bg-white" : "bg-zinc-800"
                  }`}
                >
                  <Text
                    className={`font-bold text-sm ${isSelected ? "text-black" : "text-zinc-500"}`}
                  >
                    {day.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Done Button */}
          <View className="mt-auto pb-6">
            {/* <Pressable
              onPress={handleDone}
              style={{ borderRadius: 9999, overflow: "hidden", width: "100%" }}
            >
              <LinearGradient
                colors={["#86efac", "#22d3ee"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="w-full py-4 items-center justify-center"
              >
                <Text className="text-black text-lg font-bold">Done</Text>
              </LinearGradient>
            </Pressable> */}
            <Pressable
              onPress={handleDone}
              style={{ borderRadius: 9999, overflow: "hidden", width: "100%" }}
            >
              <LinearGradient
                colors={["#86efac", "#22d3ee"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: "100%",
                  paddingVertical: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
                >
                  Done
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default TimeLimitSheet;
