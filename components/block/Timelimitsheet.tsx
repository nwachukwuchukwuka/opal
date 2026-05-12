import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
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
  { id: 1, label: "m" },
  { id: 2, label: "t" },
  { id: 3, label: "w" },
  { id: 4, label: "t" },
  { id: 5, label: "f" },
  { id: 6, label: "s" },
  { id: 0, label: "s" },
];

const ITEM_HEIGHT = 44;
const PICKER_HEIGHT = 176;

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
              className={`justify-center ${align === "right" ? "items-end pr-4" : "items-start pl-4"}`}
            >
              <Text
                className={`text-2xl ${isSelected
                  ? "text-slate-900 font-bold"
                  : "text-slate-300 font-medium"
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

    const snapPoints = useMemo(() => ["75%"], []);

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
        onDone(0, 15, selectedDays);
      } else {
        onDone(hours, minutes, selectedDays);
      }
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-8 pt-4">
          <View className="mb-8">
            <Text className="text-slate-900 text-3xl font-bold mb-2">Time limit</Text>
            <Text className="text-slate-500 text-base font-medium leading-6">
              Choose the amount of time you'd like to use these apps before they
              are blocked.
            </Text>
            <View className="bg-emerald-50 self-start px-3 py-1 rounded-full border border-emerald-100 mt-4">
              <Text className="text-emerald-600 text-[10px] font-bold">Minimum 15 minutes</Text>
            </View>
          </View>

          <View className="bg-white rounded-[44px] mb-8 overflow-hidden relative border border-slate-200">
            <View
              className="flex-row justify-center items-center px-4"
              style={{ height: PICKER_HEIGHT }}
            >
              <View
                className="absolute left-6 right-6 bg-slate-50 rounded-2xl border border-slate-100"
                style={{
                  height: ITEM_HEIGHT,
                  top: (PICKER_HEIGHT - ITEM_HEIGHT) / 2,
                }}
              />

              <View className="flex-row items-center flex-1 justify-center">
                <View style={{ width: 60 }}>
                  <WheelPicker
                    items={HOURS}
                    value={hours}
                    onValueChange={setHours}
                    align="right"
                  />
                </View>
                <Text className="text-slate-900 text-base font-bold ml-2">
                  hours
                </Text>
              </View>

              <View className="flex-row items-center flex-1 justify-center">
                <View style={{ width: 60 }}>
                  <WheelPicker
                    items={MINUTES}
                    value={minutes}
                    onValueChange={setMinutes}
                    align="right"
                  />
                </View>
                <Text className="text-slate-900 text-base font-bold ml-2">
                  mins
                </Text>
              </View>
            </View>
          </View>

          <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4 ml-2">
            On these days
          </Text>
          <View className="flex-row justify-between mb-10 px-1">
            {DAYS.map((day, index) => {
              const isSelected = selectedDays.includes(day.id);
              return (
                <Pressable
                  key={`${day.id}-${index}`}
                  onPress={() => toggleDay(day.id)}
                  className={`w-11 h-11 rounded-full items-center justify-center border ${isSelected ? "bg-emerald-600 border-emerald-600" : "bg-white border-slate-200"
                    }`}
                >
                  <Text
                    className={`font-bold text-sm ${isSelected ? "text-white" : "text-slate-400"}`}
                  >
                    {day.label.toUpperCase()}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View className="mt-auto pb-10">
            <Pressable
              onPress={handleDone}
              className="bg-emerald-600 rounded-[28px] py-6 items-center justify-center"
            >
              <Text className="text-white text-lg font-bold">Done</Text>
            </Pressable>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default TimeLimitSheet;
