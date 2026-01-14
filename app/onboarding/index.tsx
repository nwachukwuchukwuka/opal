import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StatusBar, Text, View } from "react-native";

const appIcons = [
  { name: "Instagram", color: "#E4405F", icon: "📷" },
  { name: "TikTok", color: "#000000", icon: "🎵", border: "#fff" },
  { name: "Twitter", color: "#1DA1F2", icon: "𝕏" },
  { name: "YouTube", color: "#FF0000", icon: "▶️" },
  { name: "Facebook", color: "#1877F2", icon: "f" },
  { name: "Snapchat", color: "#FFFC00", icon: "👻" },
  { name: "Reddit", color: "#FF4500", icon: "🔴" },
  { name: "Discord", color: "#5865F2", icon: "💬" },
  { name: "Twitch", color: "#9146FF", icon: "🎮" },
  { name: "Netflix", color: "#E50914", icon: "N" },
  { name: "Spotify", color: "#1DB954", icon: "🎧" },
  { name: "Pinterest", color: "#E60023", icon: "📌" },
];

const OpalLogo = ({ size = 100 }: { size?: number }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: size - 16,
          height: size - 16,
          borderRadius: (size - 16) / 2,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.2)",
        }}
      />
    </View>
  );
};

// Splash Screen Component
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 200000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <StatusBar barStyle="light-content" />
      <OpalLogo size={100} />
    </View>
  );
};

// App Icon Component for the grid
const AppIconItem = ({ app }: { app: (typeof appIcons)[0] }) => {
  return (
    <View className="m-1.5">
      <View
        style={{
          backgroundColor: app.color,
          borderWidth: app.border ? 1 : 0,
          borderColor: app.border || "transparent",
        }}
        className="w-11 h-11 rounded-xl items-center justify-center"
      >
        <Text className="text-white text-base font-bold">{app.icon}</Text>
      </View>
    </View>
  );
};

// Phone Mockup Content
const PhoneMockupContent = () => {
  return (
    <View className="items-center relative">
      <View className="w-80 h-[450px] bg-zinc-900 rounded-[3rem] p-1.5 border-[3px] border-zinc-800">
        {/* Screen */}
        <View className="flex-1 bg-black rounded-[2.5rem] overflow-hidden">
          {/* Dynamic Island / Notch */}
          <View className="items-center pt-2">
            <View className="w-24 h-7 bg-black rounded-full" />
          </View>

          {/* Status bar */}
          <View className="flex-row justify-between items-center px-8 pt-1 pb-2">
            <Text className="text-white text-xs font-semibold">9:41</Text>
            <View className="flex-row items-center gap-1">
              <Text className="text-white text-[10px]">●●●●</Text>
              <Text className="text-white text-[10px]">📶</Text>
              <Text className="text-white text-[10px]">🔋</Text>
            </View>
          </View>

          {/* Content */}
          <View className="flex-1 px-3 pt-2">
            {/* Opal Logo and tagline */}
            <View className="items-center mb-4">
              <View className="w-14 h-14 rounded-2xl bg-zinc-800/80 items-center justify-center mb-2">
                <View className="w-9 h-9 rounded-full border-2 border-white" />
              </View>
              <Text className="text-white text-sm font-bold tracking-wide">
                Opal
              </Text>
              <Text className="text-zinc-400 text-[11px] text-center mt-1 leading-4">
                Empower Humans{"\n"}to Focus Better.
              </Text>
            </View>

            {/* App grid */}
            <View className="flex-row flex-wrap justify-center px-1">
              {appIcons.slice(0, 12).map((app) => (
                <AppIconItem key={app.name} app={app} />
              ))}
            </View>

            {/* Block Apps button */}
            <View className="mt-4 mx-2">
              <View className="bg-zinc-800 py-2.5 px-6 rounded-full border border-zinc-700">
                <Text className="text-white text-center text-xs font-semibold tracking-wide">
                  Block Apps
                </Text>
              </View>
            </View>
          </View>

          {/* Home indicator */}
          <View className="items-center pb-2 pt-1">
            <View className="w-28 h-1 bg-white/30 rounded-full" />
          </View>
        </View>
      </View>
    </View>
  );
};

// Main Onboarding Screen
export default function OnboardingScreen() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleGetStarted = () => {
    router.push("/onboarding/screen-time");
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <View className="flex-1 bg-black">

      <View className="flex-1 items-center justify-center px-6 pt-8">
        <PhoneMockupContent />

        {/* Text content */}
        <View className="items-center mt-8 mb-6">
          <Text className="text-white text-[28px] font-bold mb-2 text-center tracking-tight">
            Welcome to Opal
          </Text>
          <Text className="text-zinc-500 text-base text-center leading-6">
            Starting today, let's focus better and{"\n"}accomplish your dreams.
          </Text>
        </View>

        {/* Buttons */}
        <View className="w-full px-8">
          <Pressable
            onPress={handleGetStarted}
            className="w-full py-4 rounded-full border border-white/20 bg-white/[0.03] mb-4 active:bg-white/10"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Get Started
            </Text>
          </Pressable>

          <Pressable onPress={handleSignIn} className="py-3">
            <Text className="text-zinc-500 text-center text-base">
              Already have an account?
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
