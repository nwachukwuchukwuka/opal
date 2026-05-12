import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { LogoPlaceholder } from "./LogoPlaceholder";

interface BreathingScreenProps {
  countdown: number;
  breatheIn: boolean;
  canContinue: boolean;
  breatheAnim: Animated.Value;
  progressAnim: Animated.Value;
  overlayFadeAnim: Animated.Value;
  sessionName?: string;
  remainingTime?: string;
  onContinue: () => void;
  onClose: () => void;
}

export const BreathingScreen = ({
  countdown,
  breatheIn,
  canContinue,
  breatheAnim,
  progressAnim,
  overlayFadeAnim,
  sessionName = "Work Time",
  remainingTime = "0:00:00",
  onContinue,
  onClose,
}: BreathingScreenProps) => (
  <View className="flex-1 bg-white">
    {/* Background Ethereal Glows */}
    <View className="absolute inset-0 bg-slate-50 overflow-hidden">
      <View
        className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100/30 rounded-full"
        style={{ filter: 'blur(100px)' }}
      />
      <View
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100/20 rounded-full"
        style={{ filter: 'blur(100px)' }}
      />
    </View>

    <Animated.View
      className="absolute w-full h-full bg-white items-center justify-center z-50"
      style={{ opacity: overlayFadeAnim }}
      pointerEvents="none"
    >
      <LogoPlaceholder />
      <Text className="text-slate-400 text-sm font-bold uppercase tracking-[4px] mt-8">
        Entering Zenith
      </Text>
    </Animated.View>

    {/* Top Info Pill */}
    <View className="absolute top-16 left-6 right-6 z-10">
      <View className="flex-row items-center justify-between bg-white/80 border border-slate-200 rounded-full px-6 py-4">
        <View className="flex-row items-center gap-3">
          <View className="w-8 h-8 bg-emerald-600 rounded-full items-center justify-center">
            <Ionicons name="desktop" size={14} color="white" />
          </View>
          <Text className="text-slate-900 text-base font-black">{sessionName}</Text>
        </View>
        <Text className="text-slate-400 font-bold text-xs">{remainingTime} left</Text>
      </View>
    </View>

    {/* Center Stage: The Focus Halo */}
    <View className="flex-1 items-center justify-center">
      <View className="relative items-center justify-center">
        {/* Outer Halo */}
        <Animated.View
          className="absolute w-64 h-64 rounded-full border border-emerald-100"
          style={{
            transform: [{ scale: breatheAnim }],
            opacity: 0.5,
          }}
        />
        {/* Middle Glow */}
        <Animated.View
          className="absolute w-48 h-48 rounded-full bg-emerald-50"
          style={{
            transform: [{ scale: breatheAnim }],
            opacity: 0.3,
          }}
        />
        {/* Core Orb */}
        <View className="w-40 h-40 rounded-full bg-white border-2 border-slate-100 items-center justify-center shadow-2xl shadow-emerald-900/10">
          <Animated.View
            className="w-12 h-12 rounded-full bg-emerald-600"
            style={{
              transform: [{ scale: breatheAnim }],
              shadowColor: '#059669',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 20,
            }}
          />
        </View>
      </View>

      <View className="mt-16 items-center">
        <Text className="text-slate-900 text-4xl font-black mb-2">
          {breatheIn ? "Expand" : "Release"}
        </Text>
        <Text className="text-slate-400 font-bold text-sm uppercase tracking-[3px]">
          {breatheIn ? "Fill your focus" : "Let go of noise"}
        </Text>
      </View>
    </View>

    {/* Action Zone */}
    <View className="px-8 pb-16">
      {canContinue ? (
        <Pressable
          onPress={onContinue}
          className="bg-emerald-600  rounded-[32px] h-20 items-center justify-center mb-6 shadow-xl shadow-emerald-900/20"
        >
          <Text className="text-white font-bold text-xl">Continue to Work</Text>
        </Pressable>
      ) : (
        <View className="bg-slate-100 border border-slate-200 rounded-[32px] h-20 mb-6 overflow-hidden">
          <Animated.View
            className="absolute top-0 left-0 bottom-0 bg-emerald-600/10"
            style={{
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
          />
          <View className="flex-1 items-center justify-center">
            <Text className="text-slate-900 font-bold text-lg">
              Hold for {countdown}s
            </Text>
          </View>
        </View>
      )}

      <Pressable onPress={onClose} className="items-center py-2">
        <Text className="text-slate-400 font-bold text-base">Dismiss Session</Text>
      </Pressable>
    </View>
  </View>
);
