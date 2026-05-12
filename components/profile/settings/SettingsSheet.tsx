import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Image, Pressable, Switch, Text, View } from "react-native";

export type SettingsSheetRef = BottomSheetModal;

interface SettingTileProps {
  icon:
  | keyof typeof Ionicons.glyphMap
  | keyof typeof MaterialCommunityIcons.glyphMap;
  iconLibrary?: "Ionicons" | "MaterialCommunityIcons";
  label: string;
  value?: string;
  onPress?: () => void;
  color?: string;
  size?: "small" | "medium" | "large";
}

const SettingTile = ({
  icon,
  iconLibrary = "Ionicons",
  label,
  value,
  onPress,
  color = "#059669",
  size = "medium",
}: SettingTileProps) => {
  const containerClass = size === "small" ? "w-[48%] h-32" : size === "large" ? "w-full h-40" : "w-full h-24";

  return (
    <Pressable
      onPress={onPress}
      className={`bg-white rounded-[32px] p-5 mb-4 border border-slate-50 ${containerClass} justify-between`}
    >
      <View className="flex-row justify-between items-start">
        <View className="w-10 h-10 rounded-2xl bg-slate-50 items-center justify-center border border-slate-100">
          {iconLibrary === "Ionicons" ? (
            <Ionicons name={icon as any} size={20} color={color} />
          ) : (
            <MaterialCommunityIcons name={icon as any} size={20} color={color} />
          )}
        </View>
        <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
      </View>
      <View>
        <Text className="text-slate-900 font-semibold text-sm">{label}</Text>
        {value && <Text className="text-slate-400 text-[10px] font-bold uppercase mt-1">{value}</Text>}
      </View>
    </Pressable>
  );
};

interface SettingsSheetProps {
  onPickImage: () => void;
  currentImage?: string | null;
  gemName: string;
  onEditGemName: () => void;
  onEmailPress: () => void;
  onPasswordPress: () => void;
  onPhonePress: () => void;
  phoneNumber?: string;
  onFriendsPress: () => void;
  onEnterReferralPress: () => void;
  referrerName: string | null;
  onNotificationsPress: () => void;
  onScanQRPress: () => void;
  onCustomizeBlockScreenPress: () => void;
  onSupportChatPress: () => void;
  onFAQsPress: () => void;
  onLogoutPress: () => void;
}

const SettingsSheet = forwardRef<SettingsSheetRef, SettingsSheetProps>(
  (
    {
      onPickImage,
      currentImage,
      gemName,
      onEditGemName,
      onEmailPress,
      onPasswordPress,
      onPhonePress,
      phoneNumber,
      onFriendsPress,
      onEnterReferralPress,
      referrerName,
      onNotificationsPress,
      onScanQRPress,
      onCustomizeBlockScreenPress,
      onSupportChatPress,
      onFAQsPress,
      onLogoutPress,
    },
    ref
  ) => {
    const snapPoints = useMemo(() => ["92%"], []);
    const [showAppIcons, setShowAppIcons] = useState(true);
    const [uninstallProtection, setUninstallProtection] = useState(false);

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
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        stackBehavior={"push"}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 24 }}
        >
          <View className="flex-row justify-between items-center mt-4 mb-8">
            <Text className="text-slate-900 font-bold text-2xl">Settings</Text>
            <Pressable
              onPress={() => (ref as any)?.current?.dismiss()}
              className="w-10 h-10 bg-white rounded-full items-center justify-center border border-slate-100"
            >
              <Ionicons name="close" size={24} color="#059669" />
            </Pressable>
          </View>

          {/* Premium Hero Card */}
          <View className="bg-emerald-600 rounded-[40px] p-8 mb-8 overflow-hidden">
            <View className="absolute top-[-20] right-[-20] w-40 h-40 bg-emerald-500 rounded-full opacity-20" />
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-white/20 rounded-2xl items-center justify-center">
                <Ionicons name="flash" size={24} color="white" />
              </View>
              <View className="ml-4">
                <Text className="text-white font-bold text-lg">Opal Pro</Text>
                <Text className="text-emerald-100 text-xs">Active Trial</Text>
              </View>
            </View>
            <Text className="text-emerald-50 text-sm mb-6">Your premium access expires on 9 September 2024. Renew now for uninterrupted focus.</Text>
            <Pressable className="bg-white rounded-full py-4 items-center">
              <Text className="text-emerald-700 font-bold">Manage Subscription</Text>
            </Pressable>
          </View>

          {/* Account Bento Section */}
          <View className="mb-8">
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4 px-2">Account Hub</Text>

            <View className="flex-row flex-wrap justify-between">
              {/* Profile Main Card */}
              <Pressable
                onPress={onPickImage}
                className="w-full bg-white rounded-[32px] p-6 mb-4 flex-row items-center justify-between border border-slate-50"
              >
                <View className="flex-row items-center">
                  <View className="w-16 h-16 rounded-[24px] bg-slate-50 items-center justify-center border border-slate-100 overflow-hidden">
                    {currentImage ? (
                      <Image source={{ uri: currentImage }} className="w-full h-full" />
                    ) : (
                      <Ionicons name="person" size={32} color="#94a3b8" />
                    )}
                  </View>
                  <View className="ml-4">
                    <Text className="text-slate-900 font-bold text-lg">{gemName}</Text>
                    <Text className="text-slate-400 text-xs">Software Development</Text>
                  </View>
                </View>
                <View className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-100">
                  <Ionicons name="camera" size={18} color="#059669" />
                </View>
              </Pressable>

              <SettingTile icon="diamond-outline" label="Gem Name" value={gemName} size="small" onPress={onEditGemName} />
              <SettingTile icon="mail-outline" label="Email" value="Verified" size="small" onPress={onEmailPress} />
              <SettingTile icon="key-outline" label="Security" value="Change Password" size="small" onPress={onPasswordPress} />
              <SettingTile icon="call-outline" label="Mobile" value={phoneNumber || "Add Phone"} size="small" onPress={onPhonePress} />
            </View>
          </View>

          {/* Preferences Bento */}
          <View className="mb-8">
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4 px-2">Preferences</Text>
            <View className="bg-white rounded-[40px] p-6 border border-slate-50">
              <View className="flex-row justify-between items-center mb-8">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 mr-4">
                    <Ionicons name="notifications-outline" size={20} color="#059669" />
                  </View>
                  <Text className="text-slate-900 font-semibold">Notifications</Text>
                </View>
                <Pressable onPress={onNotificationsPress} className="bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <Text className="text-slate-600 text-xs font-bold">Manage</Text>
                </Pressable>
              </View>

              <View className="flex-row justify-between items-center mb-8">
                <View className="flex-row items-center flex-1 pr-4">
                  <View className="w-10 h-10 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 mr-4">
                    <Ionicons name="apps-outline" size={20} color="#059669" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 font-semibold">App Icons</Text>
                    <Text className="text-slate-400 text-[10px] mt-1 leading-4">Visible in reports and lists</Text>
                  </View>
                </View>
                <Switch
                  value={showAppIcons}
                  onValueChange={setShowAppIcons}
                  trackColor={{ false: "#e2e8f0", true: "#10b981" }}
                  thumbColor="white"
                />
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center flex-1 pr-4">
                  <View className="w-10 h-10 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 mr-4">
                    <Ionicons name="shield-checkmark-outline" size={20} color="#059669" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 font-semibold">Protection</Text>
                    <Text className="text-slate-400 text-[10px] mt-1 leading-4">Prevent app uninstallation</Text>
                  </View>
                </View>
                <Switch
                  value={uninstallProtection}
                  onValueChange={setUninstallProtection}
                  trackColor={{ false: "#e2e8f0", true: "#10b981" }}
                  thumbColor="white"
                />
              </View>
            </View>
          </View>

          {/* Social & Help Grid */}
          <View className="mb-8">
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4 px-2">Community & Help</Text>
            <View className="flex-row flex-wrap justify-between">
              <SettingTile icon="people-outline" label="Friends" size="small" onPress={onFriendsPress} color="#6366f1" />
              <SettingTile icon="ticket-outline" label="Referral" size="small" onPress={onEnterReferralPress} color="#f59e0b" />
              <SettingTile icon="qr-code-outline" label="Scan QR" size="small" onPress={onScanQRPress} color="#ec4899" />
              <SettingTile icon="chatbox-ellipses-outline" label="Support" size="small" onPress={onSupportChatPress} color="#06b6d4" />
            </View>
            <SettingTile icon="color-palette-outline" label="Customize Block Screen" size="medium" onPress={onCustomizeBlockScreenPress} color="#8b5cf6" />
            <SettingTile icon="help-circle-outline" label="Frequently Asked Questions" size="medium" onPress={onFAQsPress} color="#64748b" />
          </View>

          {/* Footer Actions */}
          <View className="mb-10 p-2">
            <Pressable
              onPress={onLogoutPress}
              className="bg-slate-50 rounded-[32px] py-6 items-center justify-center border border-slate-100 mb-4"
            >
              <Text className="text-slate-900 font-bold text-base">Sign Out</Text>
            </Pressable>
            <Text className="text-slate-300 text-center text-[10px] uppercase font-bold tracking-widest">Opal Version 3.75 • Build 522</Text>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default SettingsSheet;
