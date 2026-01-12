// import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
// import React, { forwardRef, useCallback, useMemo, useState } from "react";
// import { Pressable, ScrollView, Text, View } from "react-native";
// import { SNOOZE_MINUTES } from "../constants";
// import { SnoozeSheetProps } from "../types";

// const SnoozeSheet = forwardRef<BottomSheet, SnoozeSheetProps>(
//   ({ onSnooze, onClose }, ref) => {
//     const [selectedMinutes, setSelectedMinutes] = useState(5);

//     const snapPoints = useMemo(() => ["55%"], []);

//     const renderBackdrop = useCallback(
//       (props: any) => (
//         <BottomSheetBackdrop
//           {...props}
//           disappearsOnIndex={-1}
//           appearsOnIndex={0}
//           opacity={0.5}
//         />
//       ),
//       []
//     );

//     const handleSnooze = () => {
//       onSnooze(selectedMinutes);
//       onClose();
//     };

//     return (
//       <BottomSheet
//         ref={ref}
//         index={-1}
//         snapPoints={snapPoints}
//         enablePanDownToClose={true}
//         backdropComponent={renderBackdrop}
//         backgroundStyle={{ backgroundColor: "#18181b" }}
//         handleIndicatorStyle={{ backgroundColor: "#52525b" }}
//       >
//         <BottomSheetView className="flex-1 px-5">
//           {/* Title */}
//           <Text className="text-white text-2xl font-bold mb-2">Snooze</Text>
//           <Text className="text-zinc-400 text-base mb-6">
//             Each time you snooze, it takes longer for a{"\n"}snooze to become available
//           </Text>

//           {/* Minutes Picker */}
//           <View className="items-center py-4 mb-4">
//             <View className="h-48 w-full relative">
//               {/* Selection highlight */}
//               <View 
//                 className="absolute left-0 right-0 h-12 bg-zinc-800 rounded-xl"
//                 style={{ top: "50%", transform: [{ translateY: -24 }] }}
//               />
              
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 snapToInterval={48}
//                 decelerationRate="fast"
//                 contentContainerStyle={{ paddingVertical: 96 }}
//               >
//                 {SNOOZE_MINUTES.map((minutes) => (
//                   <Pressable
//                     key={minutes}
//                     onPress={() => setSelectedMinutes(minutes)}
//                     className="h-12 items-center justify-center"
//                   >
//                     <View className="flex-row items-center justify-center">
//                       <Text
//                         className={`text-2xl ${
//                           selectedMinutes === minutes
//                             ? "text-white font-bold"
//                             : "text-zinc-600"
//                         }`}
//                       >
//                         {minutes}
//                       </Text>
//                       {selectedMinutes === minutes && (
//                         <Text className="text-white text-lg ml-2">minutes</Text>
//                       )}
//                     </View>
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             </View>
//           </View>

//           {/* Snooze Button */}
//           <View className="mt-auto pb-6">
//             <Pressable
//               onPress={handleSnooze}
//               className="w-full py-4 rounded-full items-center justify-center overflow-hidden"
//               style={{ backgroundColor: "#52525b" }}
//             >
//               {/* Gradient effect */}
//               <View
//                 className="absolute right-0 top-0 bottom-0 w-1/3"
//                 style={{
//                   backgroundColor: "rgba(6, 182, 164, 0.3)",
//                   borderTopRightRadius: 9999,
//                   borderBottomRightRadius: 9999,
//                 }}
//               />
//               <Text className="text-white text-lg font-semibold">Snooze</Text>
//             </Pressable>
//           </View>
//         </BottomSheetView>
//       </BottomSheet>
//     );
//   }
// );

// SnoozeSheet.displayName = "SnoozeSheet";

// export default SnoozeSheet;

import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, View } from "react-native";
import { SNOOZE_MINUTES } from "../constants"; // e.g., [5, 10, 15, 20, ...]
import { SnoozeSheetProps } from "../types";

// Define item height as a constant for easy calculations
const ITEM_HEIGHT = 48; // Corresponds to h-12 in Tailwind CSS

const SnoozeSheet = forwardRef<BottomSheet, SnoozeSheetProps>(
  ({ onSnooze, onClose }, ref) => {
    // The default value should be one of the values from your SNOOZE_MINUTES array
    const [selectedMinutes, setSelectedMinutes] = useState(SNOOZE_MINUTES[0] || 5);

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

    const handleSnooze = () => {
      onSnooze(selectedMinutes);
      onClose();
    };

    // This function is called when the user stops scrolling the picker
    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      // Calculate the index of the item that is closest to the center
      const index = Math.round(y / ITEM_HEIGHT);
      
      // Prevent going out of bounds
      const newSelectedMinutes = SNOOZE_MINUTES[index];
      if (newSelectedMinutes !== undefined) {
        setSelectedMinutes(newSelectedMinutes);
      }
    }, []);

    // We calculate the vertical padding needed to center the first and last items
    const scrollViewPadding = useMemo(() => {
        // Assuming the container is h-48 (192px)
        const containerHeight = 192; 
        return (containerHeight - ITEM_HEIGHT) / 2;
    }, []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
      >
        <BottomSheetView className="flex-1 px-5">
          {/* Title */}
          <Text className="text-white text-2xl font-bold mb-2">Snooze</Text>
          <Text className="text-zinc-400 text-base mb-6">
            Each time you snooze, it takes longer for a{"\n"}snooze to become available
          </Text>

          {/* Custom Minutes Picker */}
          <View className="items-center py-4 mb-4">
            <View className="h-48 w-full relative">
              {/* Selection highlight (this is the grey bar in the image) */}
              <View 
                className="absolute left-0 right-0 h-12 bg-zinc-800 rounded-xl"
                style={{ top: "50%", transform: [{ translateY: -24 }] }} // -24 is half of h-12
              />
              
              <ScrollView
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT} // This makes the scroll snap to each item
                decelerationRate="fast"
                // Use onMomentumScrollEnd to update state only when scroll is finished
                onMomentumScrollEnd={handleScroll} 
                contentContainerStyle={{ paddingVertical: scrollViewPadding }}
              >
                {SNOOZE_MINUTES.map((minutes) => (
                  <View
                    key={minutes}
                    className="h-12 items-center justify-center"
                  >
                    <View className="flex-row items-baseline justify-center">
                      <Text
                        className={`text-3xl font-semibold ${
                          selectedMinutes === minutes
                            ? "text-white"
                            : "text-zinc-600"
                        }`}
                      >
                        {minutes}
                      </Text>
                      {/* Show the "minutes" label only for the selected item */}
                      {selectedMinutes === minutes && (
                        <Text className="text-white text-base font-medium ml-2">minutes</Text>
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Snooze Button */}
          <View className="mt-auto pb-6">
            <Pressable
              onPress={handleSnooze}
              className="w-full py-4 rounded-full items-center justify-center bg-zinc-700"
            >
              <Text className="text-white text-lg font-semibold">Snooze</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

SnoozeSheet.displayName = "SnoozeSheet";

export default SnoozeSheet;