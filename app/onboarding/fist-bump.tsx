import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

// Floating emoji component
const FloatingEmoji = ({ emoji, style }: { emoji: string; style: object }) => (
  <Text style={[{ position: "absolute", fontSize: 28 }, style]}>{emoji}</Text>
);

export default function FistBumpScreen() {
  const handleTap = () => {
    router.push("/onboarding/subscription");
  };

  return (
    <Pressable className="flex-1 bg-black" onPress={handleTap}>
      <StatusBar barStyle="light-content" />

      {/* Floating Emojis Background */}
      <View className="absolute inset-0 overflow-hidden">
        <FloatingEmoji emoji="👊" style={{ top: "8%", left: "15%", fontSize: 24 }} />
        <FloatingEmoji emoji="🎯" style={{ top: "12%", right: "20%", fontSize: 20 }} />
        <FloatingEmoji emoji="👊" style={{ top: "20%", left: "8%", fontSize: 32 }} />
        <FloatingEmoji emoji="🎯" style={{ top: "18%", right: "10%", fontSize: 28 }} />
        <FloatingEmoji emoji="👊" style={{ top: "35%", right: "25%", fontSize: 22 }} />
        <FloatingEmoji emoji="🎯" style={{ top: "40%", left: "20%", fontSize: 26 }} />
        <FloatingEmoji emoji="👊" style={{ top: "55%", right: "12%", fontSize: 30 }} />
        <FloatingEmoji emoji="🎯" style={{ top: "60%", left: "5%", fontSize: 24 }} />
        <FloatingEmoji emoji="👊" style={{ top: "70%", right: "8%", fontSize: 28 }} />
        <FloatingEmoji emoji="🎯" style={{ top: "75%", left: "18%", fontSize: 22 }} />
        <FloatingEmoji emoji="👊" style={{ top: "85%", right: "22%", fontSize: 26 }} />
        <FloatingEmoji emoji="🎯" style={{ top: "88%", left: "10%", fontSize: 20 }} />
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Big Fist Bump */}
        <Text className="text-8xl mb-8">👊</Text>

        {/* Text */}
        <Text className="text-white text-2xl font-bold text-center mb-4">
          Let's solidify it with a fist bump
        </Text>
        <Text className="text-zinc-500 text-base text-center">
          tap to continue
        </Text>
      </View>
    </Pressable>
  );
}

