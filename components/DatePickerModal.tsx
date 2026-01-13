// import { Feather } from "@expo/vector-icons";
// import {
//   BottomSheetBackdrop,
//   BottomSheetModal,
//   BottomSheetView,
// } from "@gorhom/bottom-sheet";
// import {
//   addMonths,
//   eachDayOfInterval,
//   endOfMonth,
//   format,
//   getDay,
//   isSameDay,
//   isToday,
//   startOfMonth,
//   subMonths,
// } from "date-fns";
// import { LinearGradient } from "expo-linear-gradient";
// import React, {
//   forwardRef,
//   useCallback,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import {
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   Pressable,
//   ScrollView,
//   Text,
//   View,
// } from "react-native";

// // --- Props and Ref Type Definitions ---
// export type DatePickerModalRef = BottomSheetModal;

// interface DatePickerModalProps {
//   initialDate: Date;
//   onDateSelect: (date: Date) => void;
// }

// // --- Internal Helper Components ---

// // Reusable Wheel Picker (refined from our SnoozeSheet implementation)
// const ITEM_HEIGHT = 48;
// const WheelPicker = ({
//   items,
//   selectedValue,
//   onValueChange,
// }: {
//   items: string[];
//   selectedValue: string;
//   onValueChange: (value: string) => void;
// }) => {
//   const scrollViewRef = useRef<ScrollView>(null);
//   const selectedIndex = items.indexOf(selectedValue);

//   const handleMomentumScrollEnd = (
//     e: NativeSyntheticEvent<NativeScrollEvent>
//   ) => {
//     const y = e.nativeEvent.contentOffset.y;
//     const index = Math.round(y / ITEM_HEIGHT);
//     if (items[index]) {
//       onValueChange(items[index]);
//     }
//   };

//   return (
//     <View className="h-48 flex-1 relative">
//       <View
//         className="absolute left-0 right-0 h-12 bg-zinc-700/50 rounded-xl"
//         style={{ top: "50%", transform: [{ translateY: -24 }] }}
//       />
//       <ScrollView
//         ref={scrollViewRef}
//         showsVerticalScrollIndicator={false}
//         snapToInterval={ITEM_HEIGHT}
//         decelerationRate="fast"
//         onMomentumScrollEnd={handleMomentumScrollEnd}
//         contentContainerStyle={{ paddingVertical: 72 }} // (192 - 48) / 2 = 72
//         onLayout={() => {
//           if (selectedIndex > -1 && scrollViewRef.current) {
//             scrollViewRef.current.scrollTo({
//               y: selectedIndex * ITEM_HEIGHT,
//               animated: false,
//             });
//           }
//         }}
//       >
//         {items.map((item) => (
//           <View key={item} className="h-12 items-center justify-center">
//             <Text
//               className={`text-2xl ${selectedValue === item ? "text-white font-bold" : "text-zinc-500"}`}
//             >
//               {item}
//             </Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// // --- Main DatePickerModal Component ---
// const DatePickerModal = forwardRef<DatePickerModalRef, DatePickerModalProps>(
//   ({ initialDate, onDateSelect }, ref) => {
//     type PickerMode = "calendar" | "monthYear";

//     const [pickerMode, setPickerMode] = useState<PickerMode>("calendar");
//     const [displayDate, setDisplayDate] = useState(initialDate);
//     const [tempSelectedDate, setTempSelectedDate] = useState(initialDate);

//     const snapPoints = useMemo(() => ["70%"], []);

//     const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//     const firstDayOfMonth = startOfMonth(displayDate);
//     const lastDayOfMonth = endOfMonth(displayDate);
//     const daysInMonth = eachDayOfInterval({
//       start: firstDayOfMonth,
//       end: lastDayOfMonth,
//     });
//     const startingDayIndex = getDay(firstDayOfMonth);

//     const handleMonthChange = (direction: "prev" | "next") => {
//       setDisplayDate(
//         direction === "prev"
//           ? subMonths(displayDate, 1)
//           : addMonths(displayDate, 1)
//       );
//     };

//     const handleDone = () => {
//       onDateSelect(tempSelectedDate);
//     };

//     const renderBackdrop = useCallback(
//       (props: any) => (
//         <BottomSheetBackdrop
//           {...props}
//           disappearsOnIndex={-1}
//           appearsOnIndex={0}
//         />
//       ),
//       []
//     );

//     // Data for Wheel Picker
//     const years = useMemo(
//       () =>
//         Array.from({ length: 10 }, (_, i) =>
//           (new Date().getFullYear() - i).toString()
//         ),
//       []
//     );
//     const months = useMemo(
//       () =>
//         Array.from({ length: 12 }, (_, i) => format(new Date(0, i), "MMMM")),
//       []
//     );

//     return (
//       <BottomSheetModal
//         ref={ref}
//         index={0}
//         snapPoints={snapPoints}
//         enablePanDownToClose={true}
//         backgroundStyle={{ backgroundColor: "#27272a" }} // zinc-800
//         handleIndicatorStyle={{ backgroundColor: "#71717a" }} // zinc-500
//         backdropComponent={renderBackdrop}
//         enableDynamicSizing={false}
//       >
//         <BottomSheetView className="flex-1 px-5">
//           <Text className="text-white text-2xl font-bold mb-1">
//             Select Date
//           </Text>
//           <Text className="text-zinc-400 text-sm mb-6">
//             Go back in time to view your screen time that day
//           </Text>
//           <View className="bg-zinc-700 rounded-2xl p-4">
//             {/* Header to switch modes */}
//             <View className="flex-row justify-between items-center mb-4">
//               <Pressable
//                 onPress={() =>
//                   setPickerMode(
//                     pickerMode === "calendar" ? "monthYear" : "calendar"
//                   )
//                 }
//                 className="flex-row items-center"
//               >
//                 <Text className="text-green-400 text-lg font-bold mr-2">
//                   {format(displayDate, "MMMM yyyy")}
//                 </Text>
//                 <Feather name="chevron-down" size={20} color="#86efac" />
//               </Pressable>
//               {pickerMode === "calendar" && (
//                 <View className="flex-row items-center">
//                   <Pressable
//                     onPress={() => handleMonthChange("prev")}
//                     className="p-2"
//                   >
//                     <Feather name="chevron-left" size={24} color="#86efac" />
//                   </Pressable>
//                   <Pressable
//                     onPress={() => handleMonthChange("next")}
//                     className="p-2"
//                   >
//                     <Feather name="chevron-right" size={24} color="#86efac" />
//                   </Pressable>
//                 </View>
//               )}
//             </View>

//             {/* Main Content Area */}
//             <View className="flex-1">
//               {pickerMode === "calendar" ? (
//                 // CALENDAR VIEW
//                 <View>
//                   <View className="flex-row justify-between mb-3">
//                     {daysOfWeek.map((day) => (
//                       <Text
//                         key={day}
//                         className="text-zinc-500 text-sm text-center w-12"
//                       >
//                         {day}
//                       </Text>
//                     ))}
//                   </View>
//                   <View className="flex-row flex-wrap">
//                     {Array.from({ length: startingDayIndex }).map(
//                       (_, index) => (
//                         <View key={`empty-${index}`} className="w-12 h-12" />
//                       )
//                     )}
//                     {daysInMonth.map((day) => {
//                       const isSelected = isSameDay(day, tempSelectedDate);
//                       const isCurrentDay = isToday(day);
//                       return (
//                         <View
//                           key={day.toString()}
//                           className="w-12 h-12 items-center justify-center"
//                         >
//                           <Pressable
//                             onPress={() => setTempSelectedDate(day)}
//                             className={`w-10 h-10 rounded-full items-center justify-center
//                                 ${isSelected ? "bg-green-400" : ""}`}
//                           >
//                             <Text
//                               className={`text-base ${isSelected ? "text-black font-bold" : isCurrentDay ? "text-white" : "text-zinc-400"}`}
//                             >
//                               {format(day, "d")}
//                             </Text>
//                           </Pressable>
//                         </View>
//                       );
//                     })}
//                   </View>
//                 </View>
//               ) : (
//                 <View className="flex-row justify-center items-center">
//                   <WheelPicker
//                     items={months}
//                     selectedValue={format(displayDate, "MMMM")}
//                     onValueChange={(month) => {
//                       const newDate = new Date(
//                         displayDate.setMonth(months.indexOf(month))
//                       );
//                       setDisplayDate(newDate);
//                       setTempSelectedDate(newDate);
//                     }}
//                   />
//                   <WheelPicker
//                     items={years}
//                     selectedValue={format(displayDate, "yyyy")}
//                     onValueChange={(year) => {
//                       const newDate = new Date(
//                         displayDate.setFullYear(parseInt(year, 10))
//                       );
//                       setDisplayDate(newDate);
//                       setTempSelectedDate(newDate);
//                     }}
//                   />
//                 </View>
//               )}
//             </View>
//           </View>

//           {/* Done Button */}
//           <View className="pb-6 mt-4">
//             {/* <Pressable
//               onPress={handleDone}
//               className="w-full py-4 rounded-full items-center justify-center bg-gradient-to-r from-green-300 to-cyan-400"
//             >
//               <Text className="text-black text-lg font-bold">Done</Text>
//             </Pressable> */}
//             <Pressable
//               onPress={handleDone}
//               style={{ borderRadius: 9999, overflow: "hidden", width: "100%" }}
//             >
//               <LinearGradient
//                 colors={["#86efac", "#22d3ee"]} // green-300 to cyan-400
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={{
//                   width: "100%",
//                   paddingVertical: 16,
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Text
//                   style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
//                 >
//                   Done
//                 </Text>
//               </LinearGradient>
//             </Pressable>
//           </View>
//         </BottomSheetView>
//       </BottomSheetModal>
//     );
//   }
// );

// export default DatePickerModal;


import { Feather } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
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

export type DatePickerModalRef = BottomSheetModal;

interface DatePickerModalProps {
  initialDate: Date;
  onDateSelect: (date: Date) => void;
}

// --- CONSTANTS ---
const ITEM_HEIGHT = 40; // Tighter height for the iOS look
const PICKER_HEIGHT = 200; // Total height of the picker window

// --- Helper: Wheel Picker ---
const WheelPicker = ({
  items,
  selectedValue,
  onValueChange,
  align = "center",
}: {
  items: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  align?: "left" | "right" | "center";
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollIndex, setScrollIndex] = useState(items.indexOf(selectedValue));

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    setScrollIndex(index);
  };

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const safeIndex = Math.max(0, Math.min(index, items.length - 1));

    setScrollIndex(safeIndex);
    if (items[safeIndex]) {
      onValueChange(items[safeIndex]);
    }
  };

  // Calculate padding to center the first item
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
          const index = items.indexOf(selectedValue);
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
              className={`justify-center ${
                align === "left"
                  ? "items-start pl-4"
                  : align === "right"
                    ? "items-end pr-4"
                    : "items-center"
              }`}
            >
              <Text
                className={`text-xl ${
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

const DatePickerModal = forwardRef<DatePickerModalRef, DatePickerModalProps>(
  ({ initialDate, onDateSelect }, ref) => {
    type PickerMode = "calendar" | "monthYear";

    const [pickerMode, setPickerMode] = useState<PickerMode>("calendar");
    const [displayDate, setDisplayDate] = useState(initialDate);
    const [tempSelectedDate, setTempSelectedDate] = useState(initialDate);

    const snapPoints = useMemo(() => ["70%"], []);

    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const firstDayOfMonth = startOfMonth(displayDate);
    const lastDayOfMonth = endOfMonth(displayDate);
    const daysInMonth = eachDayOfInterval({
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    });
    const startingDayIndex = getDay(firstDayOfMonth);

    const handleMonthChange = (direction: "prev" | "next") => {
      setDisplayDate(
        direction === "prev"
          ? subMonths(displayDate, 1)
          : addMonths(displayDate, 1)
      );
    };

    const handleDone = () => {
      onDateSelect(tempSelectedDate);
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

    const years = useMemo(
      () =>
        Array.from({ length: 10 }, (_, i) =>
          (new Date().getFullYear() - i).toString()
        ).reverse(), 
      []
    );
    const months = useMemo(
      () =>
        Array.from({ length: 12 }, (_, i) => format(new Date(0, i), "MMMM")),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 px-5">
          <Text className="text-white text-2xl font-bold mb-1">
            Select Date
          </Text>
          <Text className="text-zinc-400 text-sm mb-6">
            Go back in time to view your screen time that day
          </Text>

          {/* Card Container */}
          <View className="bg-[#27272a] rounded-2xl p-4 min-h-[320px]">
            {/* Header / Mode Switcher */}
            <View className="flex-row justify-between items-center mb-4">
              <Pressable
                onPress={() =>
                  setPickerMode(
                    pickerMode === "calendar" ? "monthYear" : "calendar"
                  )
                }
                className="flex-row items-center"
              >
                <Text className="text-[#86efac] text-lg font-bold mr-2">
                  {format(displayDate, "MMMM yyyy")}
                </Text>
                <Feather name="chevron-down" size={20} color="#86efac" />
              </Pressable>

              {pickerMode === "calendar" && (
                <View className="flex-row items-center gap-2">
                  <Pressable
                    onPress={() => handleMonthChange("prev")}
                    className="p-1"
                  >
                    <Feather name="chevron-left" size={24} color="#86efac" />
                  </Pressable>
                  <Pressable
                    onPress={() => handleMonthChange("next")}
                    className="p-1"
                  >
                    <Feather name="chevron-right" size={24} color="#86efac" />
                  </Pressable>
                </View>
              )}
            </View>

            {/* Main Content Area */}
            <View className="flex-1 justify-center">
              {pickerMode === "calendar" ? (
                // --- CALENDAR VIEW ---
                <View>
                  <View className="flex-row justify-between mb-3">
                    {daysOfWeek.map((day) => (
                      <View
                        key={day}
                        style={{ width: "14.28%" }}
                        className="items-center"
                      >
                        <Text className="text-zinc-500 text-xs font-semibold">
                          {day}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View className="flex-row flex-wrap">
                    {Array.from({ length: startingDayIndex }).map(
                      (_, index) => (
                        <View
                          key={`empty-${index}`}
                          style={{ width: "14.28%" }}
                          className="h-10"
                        />
                      )
                    )}

                    {daysInMonth.map((day) => {
                      const isSelected = isSameDay(day, tempSelectedDate);
                      const isCurrentDay = isToday(day);
                      return (
                        <View
                          key={day.toString()}
                          style={{ width: "14.28%" }}
                          className="items-center justify-center mb-2"
                        >
                          <Pressable
                            onPress={() => setTempSelectedDate(day)}
                            className={`w-9 h-9 rounded-full items-center justify-center 
                                ${isSelected ? "bg-green-400" : ""}`}
                          >
                            <Text
                              className={`text-sm ${
                                isSelected
                                  ? "text-black font-bold"
                                  : isCurrentDay
                                    ? "text-white font-bold"
                                    : "text-zinc-300"
                              }`}
                            >
                              {format(day, "d")}
                            </Text>
                          </Pressable>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View
                  className="relative flex-row items-center justify-center"
                  style={{ height: PICKER_HEIGHT }}
                >
                  <View
                    className="absolute w-full bg-zinc-600/30 rounded-lg pointer-events-none"
                    style={{
                      height: ITEM_HEIGHT,
                      top: (PICKER_HEIGHT - ITEM_HEIGHT) / 2,
                    }}
                  />

                  {/* Month Picker */}
                  <View className="flex-1">
                    <WheelPicker
                      items={months}
                      selectedValue={format(displayDate, "MMMM")}
                      onValueChange={(month) => {
                        const newDate = new Date(displayDate);
                        newDate.setMonth(months.indexOf(month));
                        setDisplayDate(newDate);
                        setTempSelectedDate(newDate);
                      }}
                      align="center"
                    />
                  </View>

                  {/* Year Picker */}
                  <View className="flex-1">
                    <WheelPicker
                      items={years}
                      selectedValue={format(displayDate, "yyyy")}
                      onValueChange={(year) => {
                        const newDate = new Date(displayDate);
                        newDate.setFullYear(parseInt(year, 10));
                        setDisplayDate(newDate);
                        setTempSelectedDate(newDate);
                      }}
                      align="center"
                    />
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Done Button */}
          <View className="pb-6 mt-4">
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
                  paddingVertical: 16,
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

export default DatePickerModal;
