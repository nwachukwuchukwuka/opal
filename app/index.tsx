import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { COLORS } from "../constants";
import { useAuth } from "../context";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash screen for 2 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    // Navigate after splash is done
    if (!showSplash) {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/onboarding");
      }
    }
  }, [showSplash, isAuthenticated]);

  // Splash Screen
  return (
    <View className="flex-1 items-center justify-center bg-black">
      {/* Opal Logo */}
      <View 
        className="w-24 h-24 rounded-full items-center justify-center mb-4"
        style={{
          borderWidth: 2,
          borderColor: COLORS.white,
        }}
      >
        <View 
          className="w-20 h-20 rounded-full items-center justify-center"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <Ionicons name="diamond" size={32} color={COLORS.white} />
        </View>
      </View>
      
      {/* App Name */}
      <Text className="text-white text-2xl font-bold tracking-widest">
        OPAL
      </Text>
    </View>
  );
}
