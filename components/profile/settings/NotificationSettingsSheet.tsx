import { Ionicons } from "@expo/vector-icons";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";

export type NotificationSettingsSheetRef = BottomSheetModal;

const NotificationRow = ({
  title,
  description,
  value,
  onValueChange,
}: {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) => (
  <View className="bg-zinc-900 rounded-xl p-4 mb-3 flex-row justify-between items-center">
    <View className="flex-1 mr-4">
      <Text className="text-white font-bold text-base mb-1">{title}</Text>
      <Text className="text-zinc-500 text-xs leading-4">{description}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#3f3f46", true: "#3b82f6" }}
      thumbColor={"#f4f4f5"}
    />
  </View>
);

const NotificationSettingsSheet = forwardRef<NotificationSettingsSheetRef>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["92%"], []);

    const [settings, setSettings] = useState({
      reminders: true,
      service: true,
      appLimit: true,
      snooze: true,
      milestones: true,
      friends: true,
      marketing: true,
    });

    const toggle = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.8}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#121214" }}
        handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          {/* Header */}
          <View className="items-center mb-6">
            <Ionicons
              name="notifications"
              size={24}
              color="#3b82f6"
              style={{ marginBottom: 8 }}
            />
            <Text className="text-white text-xl font-bold mb-2">
              Notifications
            </Text>
            <Text className="text-zinc-400 text-center text-sm px-4">
              Set your preferences for which notifications to receive here.
            </Text>
          </View>

          <NotificationRow
            title="Reminders"
            description="Get notified to turn on Opal when we haven't seen you in a while."
            value={settings.reminders}
            onValueChange={() => toggle("reminders")}
          />
          <NotificationRow
            title="Service"
            description="Get notified when your schedule starts or focus session is over."
            value={settings.service}
            onValueChange={() => toggle("service")}
          />
          <NotificationRow
            title="App Limit"
            description="Get notified when you're close to reaching your App Limit."
            value={settings.appLimit}
            onValueChange={() => toggle("appLimit")}
          />
          <NotificationRow
            title="Snooze Reminders"
            description="Be notified that your snooze will end soon."
            value={settings.snooze}
            onValueChange={() => toggle("snooze")}
          />
          <NotificationRow
            title="MileStones"
            description="Get notified when you unlock a new MileStone."
            value={settings.milestones}
            onValueChange={() => toggle("milestones")}
          />
          <NotificationRow
            title="Friends"
            description="Get notified about your friends in Opal."
            value={settings.friends}
            onValueChange={() => toggle("friends")}
          />
          <NotificationRow
            title="Marketing"
            description="Get notified about promotional offers and discounts."
            value={settings.marketing}
            onValueChange={() => toggle("marketing")}
          />

          <Pressable className="bg-zinc-800 rounded-xl py-4 mt-4 items-center">
            <Text className="text-white font-bold">
              Disable Opal Notifications
            </Text>
          </Pressable>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default NotificationSettingsSheet;
