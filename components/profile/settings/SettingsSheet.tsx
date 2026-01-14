import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Image, Pressable, Switch, Text, View } from "react-native";

export type SettingsSheetRef = BottomSheetModal;


const SectionHeader = ({ title }: { title: string }) => (
  <Text className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2 mt-6 px-1">
    {title}
  </Text>
);

interface SettingRowProps {
  icon:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialCommunityIcons.glyphMap;
  iconLibrary?: "Ionicons" | "MaterialCommunityIcons";
  label: string;
  value?: string;
  showArrow?: boolean;
  isDestructive?: boolean;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (val: boolean) => void;
  description?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode; 
}

const SettingRow = ({
  icon,
  iconLibrary = "Ionicons",
  label,
  value,
  showArrow = true,
  isDestructive = false,
  hasSwitch = false,
  switchValue,
  onSwitchChange,
  description,
  onPress,
  rightElement,
}: SettingRowProps) => (
  <View className="mb-4">
    <Pressable
      onPress={hasSwitch ? undefined : onPress}
      className="flex-row items-center justify-between"
      style={({ pressed }) => ({ opacity: pressed && !hasSwitch ? 0.7 : 1 })}
    >
      <View className="flex-row items-center">
        {/* Icon */}
        <View className="w-6 items-center mr-4">
          {iconLibrary === "Ionicons" ? (
            <Ionicons
              name={icon as any}
              size={22}
              color={isDestructive ? "#ef4444" : "#a1a1aa"}
            />
          ) : (
            <MaterialCommunityIcons
              name={icon as any}
              size={22}
              color={isDestructive ? "#ef4444" : "#a1a1aa"}
            />
          )}
        </View>
        <Text
          className={`text-base ${isDestructive ? "text-red-500" : "text-white"}`}
        >
          {label}
        </Text>
      </View>

      <View className="flex-row items-center">
        {value && <Text className="text-zinc-500 text-sm mr-2">{value}</Text>}

        {rightElement}

        {hasSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: "#3f3f46", true: "#3b82f6" }}
            thumbColor={"#f4f4f5"}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        ) : (
          showArrow && (
            <Ionicons name="chevron-forward" size={18} color="#52525b" />
          )
        )}
      </View>
    </Pressable>

    {description && (
      <Text className="text-zinc-500 text-xs mt-2 leading-4 ml-10 pr-4">
        {description}
      </Text>
    )}
  </View>
);


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
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#121214" }}
        handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}
        >
          <Text className="text-white text-center font-bold text-lg mb-6">
            Settings
          </Text>

          {/* Subscription Card */}
          <View className="bg-zinc-900 rounded-2xl p-4 mb-2">
            <View className="flex-row items-center mb-1">
              <Ionicons name="flash" size={16} color="#c084fc" />
              <Text className="text-purple-400 font-bold ml-2">
                Subscribed to Opal Pro (Trial)
              </Text>
            </View>
            <Text className="text-zinc-500 text-xs ml-6">
              Renews on 9 Sep 2024
            </Text>
          </View>

          {/* --- ACCOUNT --- */}
          <SectionHeader title="Account" />
          <SettingRow
            icon="person"
            label="Profile Photo"
            onPress={onPickImage}
            rightElement={
              currentImage ? (
                <Image
                  source={{ uri: currentImage }}
                  className="w-6 h-6 rounded-full mr-2"
                />
              ) : null
            }
          />
          <SettingRow
            icon="diamond-outline"
            label="Gem Name"
            value={gemName} 
            onPress={onEditGemName} 
          />

          <SettingRow
            icon="mail-outline"
            label="Email"
            value="alexsmith.mo...+1@gmail.com"
            onPress={onEmailPress}
          />
          <SettingRow
            icon="key-outline"
            label="Password"
            onPress={onPasswordPress}
          />
          <SettingRow
            icon="call-outline"
            label="Phone"
            value={phoneNumber || ""} 
            onPress={onPhonePress} 
          />
          <SettingRow
            icon="briefcase-outline"
            label="Profession"
            value="Software Development"
          />
          <SettingRow icon="calendar-outline" label="Age" value="25 - 34" />
          <SettingRow
            icon="power-outline"
            label="Log Out"
            isDestructive={false}
            onPress={onLogoutPress}
          />

          <SectionHeader title="Social" />
          <SettingRow
            icon="people-outline"
            label="Friends"
            onPress={onFriendsPress}
          />
          {referrerName ? (
            <SettingRow
              icon="ticket-outline" 
              label={`Invited by ${referrerName}`}
            />
          ) : (
            <SettingRow
              icon="ticket-outline"
              label="Enter Referral Code"
              onPress={onEnterReferralPress}
            />
          )}

          <SectionHeader title="Focus Report" />
          <SettingRow icon="time-outline" label="First Day Report" />

          <SectionHeader title="Preferences" />
      
          <SettingRow
            icon="notifications-outline"
            label="Notifications"
            value="On"
            onPress={onNotificationsPress}
          />
          <SettingRow icon="disc-outline" label="App Score" value="Edit" />
          <SettingRow
            icon="qr-code-outline"
            label="Scan QR Code"
            onPress={onScanQRPress}
          />
          <SettingRow icon="laptop-outline" label="Install Mac App" />
          <SettingRow
            icon="apps-outline"
            label="Display App Icons"
            hasSwitch
            switchValue={showAppIcons}
            onSwitchChange={setShowAppIcons}
            description="Disable this if you're regularly experiencing app freezes when using Opal."
          />

          <SectionHeader title="Blocking Preferences" />
          <SettingRow
            icon="shield-checkmark-outline"
            label="App Uninstall Protection"
            hasSwitch
            switchValue={uninstallProtection}
            onSwitchChange={setUninstallProtection}
            description="During Sessions, you won't be able to uninstall Opal or other apps, or change your phone's time/date."
          />
      
          <SettingRow
            icon="color-palette-outline"
            label="Customize Block Screen"
            description="Customize the block screen overlay that appears when you block an app with Opal."
            onPress={onCustomizeBlockScreenPress}
          />

          <SectionHeader title="Help & Support" />
          <SettingRow
            icon="chatbox-ellipses-outline"
            label="Support Chat"
            description="Ask questions and learn how to use Opal"
            onPress={onSupportChatPress} 
          />
          <SettingRow
            icon="help-circle-outline"
            label="FAQs"
            description="All articles to use Opal better"
            onPress={onFAQsPress}
          />

          <SectionHeader title="Other" />
          <SettingRow icon="people-circle-outline" label="Join our Community" />
          <SettingRow icon="share-outline" label="Share Opal" />

          <SectionHeader title="Opal v3.75" />
          <SettingRow icon="bulb-outline" label="Suggest Improvements" />
          <SettingRow icon="reload-outline" label="Restore Purchases" />
          <SettingRow icon="information-circle-outline" label="About Opal" />
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default SettingsSheet;
