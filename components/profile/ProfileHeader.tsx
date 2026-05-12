import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { HexagonAvatar } from "./HexagonAvatar";

interface ProfileHeaderProps {
  onSettingsPress?: () => void;
  profileImage?: string | null;
  gemName: string;
  isGuest?: boolean;
  onLoginPress?: () => void;
}

export const ProfileHeader = ({
  onSettingsPress,
  profileImage,
  gemName,
  isGuest = false,
  onLoginPress,
}: ProfileHeaderProps) => (
  <View className="mb-6 relative z-10">
    {/* Minimalist Top Navigation */}
    <View className="flex-row justify-end items-center pt-2 pb-8 px-2">
      <View className="flex-row gap-3">
        <Pressable className="w-11 h-11 bg-white rounded-full items-center justify-center border border-slate-200">
          <Ionicons name="share-outline" size={22} color="#059669" />
        </Pressable>
        <Pressable
          onPress={onSettingsPress}
          className="w-11 h-11 bg-white rounded-full items-center justify-center border border-slate-200"
        >
          <Ionicons name="settings-outline" size={22} color="#059669" />
        </Pressable>
      </View>
    </View>

    {/* Modern Centered Hero Card */}
    <View className="bg-white border border-slate-200 rounded-[48px] p-8 items-center">
      {/* Centered Avatar Stack */}
      <View className="relative mb-6">
        <View className="w-28 h-28 rounded-[36px] bg-slate-50 items-center justify-center border-4 border-white overflow-hidden">
          {profileImage && !isGuest ? (
            <Image
              source={{ uri: profileImage }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <HexagonAvatar color={isGuest ? "#94a3b8" : "#059669"} size={90} />
          )}
        </View>
        <View className={`absolute -bottom-1 -right-1 px-3 py-1.5 rounded-2xl border-2 border-white ${isGuest ? "bg-slate-200" : "bg-emerald-600"
          }`}>
          <Text className="text-white text-[10px] font-bold">
            {isGuest ? "Free" : "Pro"}
          </Text>
        </View>
      </View>

      {/* Identity Section */}
      <View className="items-center mb-6">
        <Text className="text-slate-900 text-3xl font-semibold mb-1">
          {isGuest ? "Guest" : gemName}
        </Text>
        <Text className="text-slate-400 text-sm font-medium">
          Software Development, 25 - 34
        </Text>
      </View>

      {/* Floating Badge Stats */}
      <View className="flex-row gap-3 mb-8">
        <View className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
          <Text className="text-emerald-700 text-xs font-bold">
            {isGuest ? "Top 0%" : "Top 77%"}
          </Text>
        </View>
        <View className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
          <Text className="text-slate-500 text-xs font-bold">
            2.4k Focused
          </Text>
        </View>
      </View>

      {/* Full-Width Login Action for Guests */}
      {isGuest && (
        <Pressable
          onPress={onLoginPress}
          className="bg-emerald-600 w-full py-5 rounded-[28px] items-center justify-center"
        >
          <Text className="text-white text-base font-semibold">
            Sign Up / Log In
          </Text>
        </Pressable>
      )}
    </View>
  </View>
);
