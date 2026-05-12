import { Ionicons } from "@expo/vector-icons";
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

const ITEM_HEIGHT = 48;
const PICKER_HEIGHT = 160;

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
              className={`justify-center ${align === "left"
                ? "items-start pl-4"
                : align === "right"
                  ? "items-end pr-4"
                  : "items-center"
                }`}
            >
              <Text
                className={`text-lg font-bold ${isSelected ? "text-emerald-950" : "text-slate-300"
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

    const snapPoints = useMemo(() => ["80%"], []);

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
          opacity={0.5}
        />
      ),
      []
    );

    const years = useMemo(
      () =>
        Array.from({ length: 20 }, (_, i) =>
          (new Date().getFullYear() - 10 + i).toString()
        ),
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
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 px-6 pt-2">

          <View className="bg-white border border-slate-200 rounded-[36px] p-6 mb-6 flex-row items-center justify-between">
            <View>
              <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                Selected Date
              </Text>
              <Text className="text-slate-900 text-2xl font-extrabold">
                {format(tempSelectedDate, "EEEE, MMM d")}
              </Text>
            </View>
            <View className="w-14 h-14 bg-emerald-50 rounded-[20px] items-center justify-center border border-emerald-100">
              <Ionicons name="calendar-clear" size={28} color="#059669" />
            </View>
          </View>

          {/* Navigation & Controls Card */}
          <View className="bg-white border border-slate-200 rounded-[40px] p-2 mb-6">
            <View className="flex-row items-center justify-between p-2">
              <Pressable
                onPress={() => handleMonthChange("prev")}
                className="w-12 h-12 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100"
              >
                <Ionicons name="arrow-back" size={20} color="#64748b" />
              </Pressable>

              <Pressable
                onPress={() => setPickerMode(pickerMode === "calendar" ? "monthYear" : "calendar")}
                className="flex-1 mx-4 h-12 bg-slate-900 rounded-2xl items-center justify-center flex-row"
              >
                <Text className="text-white font-bold text-base mr-2">
                  {format(displayDate, "MMMM yyyy")}
                </Text>
                <Ionicons
                  name={pickerMode === "calendar" ? "chevron-down-circle" : "checkmark-circle"}
                  size={18}
                  color="#ffffff"
                />
              </Pressable>

              <Pressable
                onPress={() => handleMonthChange("next")}
                className="w-12 h-12 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100"
              >
                <Ionicons name="arrow-forward" size={20} color="#64748b" />
              </Pressable>
            </View>

            {/* Sub-view Area */}
            <View className="p-4">
              {pickerMode === "calendar" ? (
                <View>
                  <View className="flex-row justify-between mb-4 border-b border-slate-50 pb-2">
                    {daysOfWeek.map((day, idx) => (
                      <View key={`dow-${idx}`} style={{ width: "14.28%" }} className="items-center">
                        <Text className="text-slate-300 text-[10px] font-black uppercase">
                          {day}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View className="flex-row flex-wrap">
                    {Array.from({ length: startingDayIndex }).map((_, index) => (
                      <View key={`empty-${index}`} style={{ width: "14.28%" }} className="h-10" />
                    ))}

                    {daysInMonth.map((day) => {
                      const isSelected = isSameDay(day, tempSelectedDate);
                      const isCurr = isToday(day);
                      return (
                        <View
                          key={day.toString()}
                          style={{ width: "14.28%" }}
                          className="items-center justify-center mb-1"
                        >
                          <Pressable
                            onPress={() => setTempSelectedDate(day)}
                            className={`w-10 h-10 rounded-xl items-center justify-center ${isSelected
                              ? "bg-emerald-600 shadow-md shadow-emerald-900/20"
                              : isCurr
                                ? "bg-emerald-50"
                                : ""
                              }`}
                          >
                            <Text className={`text-sm font-bold ${isSelected ? "text-white" : isCurr ? "text-emerald-600" : "text-slate-600"
                              }`}>
                              {format(day, "d")}
                            </Text>
                          </Pressable>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View className="flex-row items-center justify-center" style={{ height: PICKER_HEIGHT }}>
                  <View className="absolute left-0 right-0 h-12 bg-slate-50 rounded-2xl border border-slate-100" />
                  <View className="flex-1">
                    <WheelPicker
                      items={months}
                      selectedValue={format(displayDate, "MMMM")}
                      onValueChange={(month) => {
                        const d = new Date(displayDate);
                        d.setMonth(months.indexOf(month));
                        setDisplayDate(d);
                      }}
                    />
                  </View>
                  <View className="flex-1">
                    <WheelPicker
                      items={years}
                      selectedValue={format(displayDate, "yyyy")}
                      onValueChange={(year) => {
                        const d = new Date(displayDate);
                        d.setFullYear(parseInt(year, 10));
                        setDisplayDate(d);
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Large Floating Action Button */}
          <View className="mt-auto pb-10">
            <Pressable
              onPress={handleDone}
              className="w-full py-5 bg-emerald-600 rounded-[32px] items-center justify-center border border-emerald-500"
            >
              <View className="flex-row items-center">
                <Ionicons name="checkmark-sharp" size={24} color="white" />
                <Text className="text-white text-xl font-bold ml-2">Apply Selection</Text>
              </View>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

DatePickerModal.displayName = "DatePickerModal";

export default DatePickerModal;
