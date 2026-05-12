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
  <View className="bg-white rounded-3xl p-5 mb-4 flex-row justify-between items-center border border-slate-50">
    <View className="flex-1 mr-4">
      <Text className="text-slate-900 font-bold text-base mb-1">{title}</Text>
      <Text className="text-slate-400 text-xs leading-4 font-medium">{description}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#e2e8f0", true: "#10b981" }}
      thumbColor="white"
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
          opacity={0.5}
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
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {/* Header Hero */}
          <View className="px-8 pt-6 mb-10 items-center">
            <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-6">
              <Ionicons name="notifications" size={40} color="#059669" />
            </View>
            <Text className="text-slate-900 text-3xl font-bold mb-3">Notifications</Text>
            <Text className="text-slate-400 text-center text-base leading-6 font-medium px-4">
              Control how and when Opal reaches out to help you stay focused.
            </Text>
          </View>

          <View className="px-6">
            <Text className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-4 px-2">Core experience</Text>
            <NotificationRow
              title="Reminders"
              description="Nudges to turn on Opal when you're active."
              value={settings.reminders}
              onValueChange={() => toggle("reminders")}
            />
            <NotificationRow
              title="Service"
              description="Alerts for session starts and completions."
              value={settings.service}
              onValueChange={() => toggle("service")}
            />
            <NotificationRow
              title="App limit"
              description="Notifications when you approach your daily limits."
              value={settings.appLimit}
              onValueChange={() => toggle("appLimit")}
            />

            <Text className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mt-6 mb-4 px-2">Community & growth</Text>
            <NotificationRow
              title="Milestones"
              description="Celebrations when you unlock new achievements."
              value={settings.milestones}
              onValueChange={() => toggle("milestones")}
            />
            <NotificationRow
              title="Friends"
              description="Updates on friend activity and leaderboards."
              value={settings.friends}
              onValueChange={() => toggle("friends")}
            />

            <Text className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mt-6 mb-4 px-2">Other</Text>
            <NotificationRow
              title="Marketing"
              description="Stay updated with offers and focus tips."
              value={settings.marketing}
              onValueChange={() => toggle("marketing")}
            />

            <Pressable className="bg-white rounded-[32px] py-6 mt-6 items-center border border-slate-100 mb-4">
              <Text className="text-red-500 font-bold">Disable All Notifications</Text>
            </Pressable>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default NotificationSettingsSheet;
