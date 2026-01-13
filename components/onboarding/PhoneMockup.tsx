import React from "react";
import { Text, View } from "react-native";
import { AppIconProps, PhoneMockupProps } from "../../types";

// App icons data - simulating popular apps
const appIcons = [
  { name: "Instagram", color: "#E4405F", icon: "📷" },
  { name: "TikTok", color: "#000000", icon: "🎵" },
  { name: "Twitter", color: "#1DA1F2", icon: "🐦" },
  { name: "YouTube", color: "#FF0000", icon: "▶️" },
  { name: "Facebook", color: "#1877F2", icon: "👤" },
  { name: "Snapchat", color: "#FFFC00", icon: "👻" },
  { name: "Reddit", color: "#FF4500", icon: "🔴" },
  { name: "Discord", color: "#5865F2", icon: "💬" },
  { name: "Twitch", color: "#9146FF", icon: "🎮" },
  { name: "Netflix", color: "#E50914", icon: "🎬" },
  { name: "Spotify", color: "#1DB954", icon: "🎧" },
  { name: "Pinterest", color: "#E60023", icon: "📌" },
];

const AppIcon: React.FC<AppIconProps> = ({ app, blocked = false }) => {
  return (
    <View className="items-center m-1">
      <View
        style={{ backgroundColor: app.color }}
        className="w-10 h-10 rounded-xl items-center justify-center"
      >
        <Text className="text-lg">{app.icon}</Text>
        {blocked && (
          <View className="absolute inset-0 bg-black/60 rounded-xl items-center justify-center">
            <Text className="text-white text-xs">🔒</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  variant = "apps",
  showBlockButton = true,
}) => {
  return (
    <View className="items-center">
      {/* Phone frame */}
      <View className="w-80 h-96 bg-zinc-900 rounded-[2.5rem] p-1 border-2 border-zinc-800">
        {/* Screen */}
        <View className="flex-1 bg-black rounded-[2.25rem] overflow-hidden">
          {/* Status bar */}
          <View className="flex-row justify-between items-center px-6 pt-3 pb-2">
            <Text className="text-white text-xs font-semibold">9:41</Text>
            <View className="w-20 h-6 bg-black rounded-full" />
            <View className="flex-row items-center gap-1">
              <Text className="text-white text-xs">📶</Text>
              <Text className="text-white text-xs">🔋</Text>
            </View>
          </View>

          {/* Content area */}
          <View className="flex-1 px-2 pt-2">
            {variant === "apps" && (
              <>
                {/* Opal header */}
                <View className="items-center mb-3">
                  <View className="w-12 h-12 rounded-2xl bg-zinc-800 items-center justify-center mb-2">
                    <View className="w-8 h-8 rounded-full border-2 border-white" />
                  </View>
                  <Text className="text-white text-sm font-semibold">Opal</Text>
                  <Text className="text-zinc-400 text-[10px] text-center px-2">
                    Empower Humans{"\n"}to Focus Better.
                  </Text>
                </View>

                {/* App grid */}
                <View className="flex-row flex-wrap justify-center">
                  {appIcons.slice(0, 9).map((app) => (
                    <AppIcon key={app.name} app={app} />
                  ))}
                </View>

                {/* Block Apps button */}
                {showBlockButton && (
                  <View className="mt-3 mx-4">
                    <View className="bg-zinc-800 py-2 px-4 rounded-full">
                      <Text className="text-white text-center text-xs font-semibold">
                        Block Apps
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}

            {variant === "focus" && (
              <View className="flex-1 items-center justify-center">
                <View className="w-20 h-20 rounded-full border-4 border-white items-center justify-center mb-4">
                  <Text className="text-white text-2xl font-bold">25</Text>
                  <Text className="text-zinc-400 text-[10px]">min</Text>
                </View>
                <Text className="text-white text-sm font-semibold">
                  Focus Mode
                </Text>
                <Text className="text-zinc-400 text-[10px]">
                  Stay focused, stay calm
                </Text>
              </View>
            )}

            {variant === "stats" && (
              <View className="flex-1 px-2">
                <Text className="text-white text-sm font-semibold mb-2">
                  Today's Progress
                </Text>
                <View className="bg-zinc-800 rounded-xl p-3 mb-2">
                  <Text className="text-zinc-400 text-[10px]">Screen Time</Text>
                  <Text className="text-white text-lg font-bold">2h 34m</Text>
                  <View className="h-1 bg-zinc-700 rounded-full mt-1">
                    <View className="h-1 bg-green-500 rounded-full w-1/3" />
                  </View>
                </View>
                <View className="bg-zinc-800 rounded-xl p-3">
                  <Text className="text-zinc-400 text-[10px]">
                    Focus Sessions
                  </Text>
                  <Text className="text-white text-lg font-bold">
                    4 sessions
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Home indicator */}
          <View className="items-center pb-2">
            <View className="w-24 h-1 bg-white/30 rounded-full" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PhoneMockup;
