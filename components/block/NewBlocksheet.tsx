import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

export type NewBlockSheetRef = BottomSheetModal;

interface BlockOptionProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress?: () => void;
  bgColor: string;
  iconColor: string;
}

const BlockOption = ({
  icon,
  title,
  description,
  onPress,
  bgColor,
  iconColor,
}: BlockOptionProps) => (
  <Pressable
    onPress={onPress}
    className="w-[48%] aspect-[0.85] p-5 rounded-[32px] items-center justify-center border border-slate-200"
    style={{ backgroundColor: bgColor }}
  >
    <View className="w-14 h-14 bg-white rounded-2xl items-center justify-center mb-4 border border-slate-100">
      <Ionicons name={icon} size={28} color={iconColor} />
    </View>
    <Text className="text-slate-900 font-bold text-base text-center mb-1 leading-tight">
      {title}
    </Text>
    <Text className="text-slate-500 text-[10px] text-center leading-3 px-1" numberOfLines={3}>
      {description}
    </Text>
  </Pressable>
);

interface NewBlockSheetProps {
  onBlockNow?: () => void;
  onRecurringSession?: () => void;
  onAppLimit?: () => void;
  onLock?: () => void;
}

const NewBlockSheet = forwardRef<NewBlockSheetRef, NewBlockSheetProps>(
  ({ onBlockNow, onRecurringSession, onAppLimit, onLock }, ref) => {
    const snapPoints = useMemo(() => ["70%"], []);

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

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 px-6 pt-4">
          <View className="items-center mb-8">
            <View className="w-12 h-1 bg-slate-200 rounded-full mb-6 opacity-0" />
            <Text className="text-slate-900 text-2xl font-extrabold text-center mb-1">
              How do you want to block?
            </Text>
            <Text className="text-slate-500 text-sm font-medium text-center">
              Select your preferred focus method
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between gap-4">
            <BlockOption
              icon="play"
              title="Block Now"
              description="Immediate focus session to stop distractions."
              bgColor="#ffffff"
              iconColor="#059669"
              onPress={onBlockNow}
            />
            <BlockOption
              icon="repeat"
              title="Recurring"
              description="Schedule blocks for specific times and days."
              bgColor="#ffffff"
              iconColor="#10b981"
              onPress={onRecurringSession}
            />
            <BlockOption
              icon="hourglass-outline"
              title="App Limit"
              description="Set a daily allowance for specific apps."
              bgColor="#ffffff"
              iconColor="#059669"
              onPress={onAppLimit}
            />
            <BlockOption
              icon="lock-closed-outline"
              title="Lock Apps"
              description="Keep apps locked until you truly need them."
              bgColor="#ffffff"
              iconColor="#10b981"
              onPress={onLock}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default NewBlockSheet;
