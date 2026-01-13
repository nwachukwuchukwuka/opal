// import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
// import React, { forwardRef, useCallback, useMemo, useState } from "react";
// import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, View } from "react-native";

// export type DisableDurationSheetRef = BottomSheetModal;

// interface DisableDurationSheetProps {
//   onDisableForDays: (days: number) => void;
//   onDisableIndefinitely: () => void;
// }

// const ITEM_HEIGHT = 48;
// const PICKER_HEIGHT = 192;
// const DISABLE_DAYS = Array.from({ length: 30 }, (_, i) => i + 1); // e.g., [1, 2, ..., 30]

// const DisableDurationSheet = forwardRef<DisableDurationSheetRef, DisableDurationSheetProps>(
//   ({ onDisableForDays, onDisableIndefinitely }, ref) => {
//     const [selectedDays, setSelectedDays] = useState(1);
//     const snapPoints = useMemo(() => ["55%"], []);

//     const handleMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
//       const y = event.nativeEvent.contentOffset.y;
//       const index = Math.round(y / ITEM_HEIGHT);
//       const days = DISABLE_DAYS[index];
//       if (days) {
//         setSelectedDays(days);
//       }
//     }, []);

//     const renderBackdrop = useCallback(
//       (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.7} />,
//       []
//     );

//     return (
//       <BottomSheetModal
//         ref={ref}
//         snapPoints={snapPoints}
//         backgroundStyle={{ backgroundColor: "#18181b" }}
//         handleIndicatorStyle={{ backgroundColor: "#52525b" }}
//         backdropComponent={renderBackdrop}
//       >
//         <BottomSheetView className="flex-1 px-5">
//           <Text className="text-white text-2xl font-bold mb-2">Set disable duration</Text>
//           <Text className="text-zinc-400 text-base mb-6">
//             Opal will automatically enable this session when you come back, or you can manually turn it back on.
//           </Text>

//           {/* Days Picker */}
//           <View className="items-center py-4 mb-4">
//             <View className="h-48 w-full relative" style={{ height: PICKER_HEIGHT }}>
//               <View
//                 className="absolute left-0 right-0 h-12 bg-zinc-800 rounded-xl"
//                 style={{ top: "50%", transform: [{ translateY: -24 }] }}
//               />
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 snapToInterval={ITEM_HEIGHT}
//                 decelerationRate="fast"
//                 onMomentumScrollEnd={handleMomentumScrollEnd}
//                 contentContainerStyle={{ paddingVertical: (PICKER_HEIGHT - ITEM_HEIGHT) / 2 }}
//               >
//                 {DISABLE_DAYS.map((day) => (
//                   <Pressable key={day} className="h-12 items-center justify-center">
//                     <View className="flex-row items-baseline justify-center">
//                       <Text className={`text-3xl font-semibold ${selectedDays === day ? "text-white" : "text-zinc-600"}`}>
//                         {day}
//                       </Text>
//                       {selectedDays === day && (
//                         <Text className="text-white text-lg ml-2 font-medium">
//                           {day > 1 ? 'days' : 'day'}
//                         </Text>
//                       )}
//                     </View>
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             </View>
//           </View>

//           {/* Action Buttons */}
//           <View className="mt-auto pb-6 gap-3">
//             <Pressable
//               onPress={() => onDisableForDays(selectedDays)}
//               className="w-full py-4 rounded-full bg-white items-center justify-center"
//             >
//               <Text className="text-black text-lg font-bold">
//                 Disable for {selectedDays} {selectedDays > 1 ? 'days' : 'day'}
//               </Text>
//             </Pressable>
//             <Pressable
//               onPress={onDisableIndefinitely}
//               className="w-full py-4 rounded-full bg-zinc-800 items-center justify-center"
//             >
//               <Text className="text-white text-lg font-semibold">Disable indefinitely</Text>
//             </Pressable>
//           </View>
//         </BottomSheetView>
//       </BottomSheetModal>
//     );
//   }
// );

// export default DisableDurationSheet;

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
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

export type DisableDurationSheetRef = BottomSheetModal;

interface DisableDurationSheetProps {
  onDisableForDays: (days: number) => void;
  onDisableIndefinitely: () => void;
}

const ITEM_HEIGHT = 48;
const PICKER_HEIGHT = 192;
const DISABLE_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

const DisableDurationSheet = forwardRef<
  DisableDurationSheetRef,
  DisableDurationSheetProps
>(({ onDisableForDays, onDisableIndefinitely }, ref) => {
  const [selectedDays, setSelectedDays] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const snapPoints = useMemo(() => ["70%"], []);

  const calculateIndex = (y: number) => {
    const index = Math.round(y / ITEM_HEIGHT);
    return Math.max(0, Math.min(index, DISABLE_DAYS.length - 1));
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = calculateIndex(y);
    const day = DISABLE_DAYS[index];
    if (day !== selectedDays) {
      setSelectedDays(day);
    }
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = calculateIndex(y);
    setSelectedDays(DISABLE_DAYS[index]);
  };

  const handleItemPress = (index: number) => {
    scrollViewRef.current?.scrollTo({
      y: index * ITEM_HEIGHT,
      animated: true,
    });
    setSelectedDays(DISABLE_DAYS[index]);
  };

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
        <Text className="text-white text-2xl font-bold mb-2">
          Set disable duration
        </Text>
        <Text className="text-zinc-400 text-base mb-6">
          Opal will automatically enable this session when you come back, or you
          can manually turn it back on.
        </Text>

        {/* Days Picker */}
        <View className="items-center py-4 mb-4">
          <View className="w-full relative" style={{ height: PICKER_HEIGHT }}>
            {/* Highlight Bar */}
            <View
              className="absolute left-0 right-0 bg-zinc-800 rounded-xl"
              style={{
                height: ITEM_HEIGHT,
                top: (PICKER_HEIGHT - ITEM_HEIGHT) / 2,
              }}
            />

            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onScroll={handleScroll}
              scrollEventThrottle={16}
              onMomentumScrollEnd={handleMomentumScrollEnd}
              contentContainerStyle={{
                paddingVertical: (PICKER_HEIGHT - ITEM_HEIGHT) / 2,
              }}
            >
              {DISABLE_DAYS.map((day, index) => {
                const isSelected = selectedDays === day;
                return (
                  <Pressable
                    key={day}
                    onPress={() => handleItemPress(index)}
                    style={{ height: ITEM_HEIGHT }}
                    className="items-center justify-center"
                  >
                    <View className="flex-row items-baseline justify-center">
                      <Text
                        className={`text-xl font-semibold ${
                          isSelected ? "text-white" : "text-zinc-600"
                        }`}
                      >
                        {day}
                      </Text>
                      {isSelected && (
                        <Text className="text-white text-lg ml-2 font-medium">
                          {day > 1 ? "days" : "day"}
                        </Text>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-auto pb-6 gap-3">
          <Pressable
            onPress={() => onDisableForDays(selectedDays)}
            className="w-full py-4 rounded-full bg-white items-center justify-center"
          >
            <Text className="text-black text-lg font-bold">
              Disable for {selectedDays} {selectedDays > 1 ? "days" : "day"}
            </Text>
          </Pressable>
          <Pressable
            onPress={onDisableIndefinitely}
            className="w-full py-4 rounded-full bg-zinc-800 items-center justify-center"
          >
            <Text className="text-white text-lg font-semibold">
              Disable indefinitely
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DisableDurationSheet;
