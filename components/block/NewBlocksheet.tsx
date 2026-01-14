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
}

const BlockOption = ({
  icon,
  title,
  description,
  onPress,
}: BlockOptionProps) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center py-4 border-b border-zinc-800"
    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
  >
    <View className="w-10 h-10 bg-zinc-800 rounded-lg items-center justify-center mr-4">
      <Ionicons name={icon} size={20} color="#a1a1aa" />
    </View>
    <View className="flex-1">
      <Text className="text-white font-semibold text-base">{title}</Text>
      <Text className="text-zinc-500 text-sm" numberOfLines={2}>
        {description}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#71717a" />
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
          {/* Title */}
          <Text className="text-white text-2xl font-bold mb-6">
            How do you want to Block?
          </Text>

          {/* Options */}
          <View>
            <BlockOption
              icon="play"
              title="Block Now"
              description="You can't start a session while you have another active session."
              onPress={onBlockNow}
            />
            <BlockOption
              icon="repeat"
              title="Recurring Session"
              description="Block on the times and days you select."
              onPress={onRecurringSession}
            />
            <BlockOption
              icon="hourglass-outline"
              title="App Limit"
              description="Set a daily time limit for an app. After reaching the limit, the app will be blocked."
              onPress={onAppLimit}
            />
            <BlockOption
              icon="lock-closed-outline"
              title="Lock"
              description="Set a limit on how many times you can open an app each day. The app starts locked, and you can unlock it with a tap."
              onPress={onLock}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default NewBlockSheet;
