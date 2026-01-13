import { BREATHING_BG } from "@/constants/appData";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
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
  <View className="flex-1 bg-black">
    <Image
      source={{ uri: BREATHING_BG }}
      className="absolute w-full h-full"
      resizeMode="cover"
    />

    <Animated.View
      className="absolute w-full h-full"
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        opacity: overlayFadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        }),
      }}
      pointerEvents="none"
    />

    <Animated.View
      className="absolute w-full h-full bg-zinc-900 items-center justify-center"
      style={{ opacity: overlayFadeAnim }}
      pointerEvents="none"
    >
      <LogoPlaceholder />
      <Text className="text-zinc-400 text-lg mt-8">Almost there</Text>
    </Animated.View>

    <View className="absolute top-20 left-5">
      <View className="flex-row items-center">
        <Ionicons name="desktop-outline" size={16} color="white" />
        <Text className="text-white font-semibold ml-2">{sessionName}</Text>
      </View>
      <Text className="text-emerald-400 text-sm">
        Remaining {remainingTime}
      </Text>
    </View>

    <View className="flex-1 items-center justify-center">
      <Animated.View
        className="w-24 h-24 rounded-full border-4 border-white items-center justify-center"
        style={{
          transform: [{ scale: breatheAnim }],
          opacity: 0.9,
        }}
      >
        <View className="w-4 h-4 rounded-full bg-white" />
      </Animated.View>
      <Text className="text-white text-2xl font-semibold mt-6">
        {breatheIn ? "Breathe In" : "Breathe Out"}
      </Text>
    </View>

    {/* Bottom Actions */}
    <View className="px-6 pb-12">
      {canContinue ? (
        <Pressable
          onPress={onContinue}
          className="bg-white rounded-full h-14 items-center justify-center mb-4"
        >
          <Text className="text-black font-semibold text-base">Continue</Text>
        </Pressable>
      ) : (
        <View className="bg-white/20 rounded-full overflow-hidden h-14 mb-4">
          <Animated.View
            className="absolute top-0 left-0 bottom-0 bg-white/30 rounded-full"
            style={{
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
          />
          <View className="flex-1 items-center justify-center">
            <Text className="text-white font-semibold text-base">
              Wait for {countdown}s
            </Text>
          </View>
        </View>
      )}

      <Pressable onPress={onClose} className="items-center">
        <Text className="text-white/70 text-base">Nevermind</Text>
      </Pressable>
    </View>
  </View>
);
