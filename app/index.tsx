import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../context";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/onboarding");
      }
    }
  }, [showSplash, isAuthenticated]);

  return (
    <View className="flex-1 bg-slate-50">

      <View className="flex-[0.65] bg-emerald-50 rounded-b-[80px] items-center justify-center border-b-[6px] border-emerald-100 relative overflow-hidden">

        <View className="absolute opacity-10 scale-150">
          <Ionicons name="diamond" size={300} color="#059669" />
        </View>

        <View className="w-28 h-28 bg-emerald-600 rounded-[36px] items-center justify-center border-[4px] border-emerald-100 z-10">
          <Ionicons name="diamond" size={48} color="#ffffff" />
        </View>

      </View>

      <View className="flex-[0.35] justify-end px-10 pb-20">
        <Text className="text-slate-900 text-6xl font-extrabold mb-3">
          Opal
        </Text>
        <Text className="text-slate-500 text-lg font-bold">
          Find your focus and unlock your time.
        </Text>
      </View>

    </View>
  );
}