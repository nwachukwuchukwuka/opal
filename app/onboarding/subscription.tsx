import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStoreSheet from "../../components/AppStoreSheet";
import SuccessModal from "./SuccessModal";

const timelineSteps = [
  {
    id: 1,
    icon: "✅",
    title: "Get your Focus Diagnosis",
    description: "You successfully started your journey",
    completed: true,
  },
  {
    id: 2,
    icon: "🎯",
    title: "Today: Improve Your Focus",
    description:
      "Block Apps automatically. Get your detailed stats and stay on track.",
    active: true,
  },
  {
    id: 3,
    icon: "📊",
    title: "Day 6: See first results",
    description:
      "We'll send you a notification with a report to see how you improved this week.",
    upcoming: true,
  },
  {
    id: 4,
    icon: "⏰",
    title: "Day 7: Trial Ends",
    description:
      "Your subscription will start on day 7. Cancel anytime within 24hrs.",
    upcoming: true,
  },
];

const pressLogos = ["TNW", "TC", "FORBES", "PH"];

export default function SubscriptionScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [showRestoreSuccess, setShowRestoreSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleStartTrial = () => {
    bottomSheetRef.current?.present();
  };

  const handleRestore = () => {
    // Show restore purchases - in real app would check App Store
    setShowRestoreSuccess(true);
    setTimeout(() => {
      setShowRestoreSuccess(false);
    }, 2000);
  };

  const handleSkip = () => {
    router.push("/onboarding/focus-intro");
  };

  // const handleSubscriptionComplete = () => {
  //   bottomSheetRef.current?.dismiss();
  //   router.push("/onboarding/subscription-success");
  // };
  const handleSubscriptionComplete = () => {
    bottomSheetRef.current?.dismiss();
    setShowSuccessModal(true);
  };

  const handleSuccessFinished = () => {
    setShowSuccessModal(false);
    router.push("/onboarding/focus-intro");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView edges={["top"]} className="flex-1 bg-black">
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center px-6 mb-6">
              <Pressable onPress={handleRestore}>
                <Text className="text-zinc-500 text-sm">Restore</Text>
              </Pressable>
              <Pressable onPress={handleSkip}>
                <Text className="text-zinc-500 text-xl">×</Text>
              </Pressable>
            </View>

            {/* Title */}
            <View className="px-6 mb-8">
              <Text className="text-white text-2xl font-bold text-center">
                Start your Free Week and gain 2+ hours back
              </Text>
            </View>

            {/* Timeline */}
            <View className="px-6 mb-8">
              {timelineSteps.map((step, index) => (
                <View key={step.id} className="flex-row mb-6">
                  {/* Timeline line */}
                  <View className="items-center mr-4">
                    <View
                      className={`w-10 h-10 rounded-full items-center justify-center ${
                        step.completed
                          ? "bg-emerald-500/20"
                          : step.active
                            ? "bg-orange-500/20"
                            : "bg-zinc-800"
                      }`}
                    >
                      <Text className="text-lg">{step.icon}</Text>
                    </View>
                    {index < timelineSteps.length - 1 && (
                      <View className="w-0.5 h-12 bg-zinc-800 mt-2" />
                    )}
                  </View>

                  {/* Content */}
                  <View className="flex-1 pt-1">
                    <Text
                      className={`text-base font-semibold mb-1 ${
                        step.completed || step.active
                          ? "text-white"
                          : "text-zinc-400"
                      }`}
                    >
                      {step.title}
                    </Text>
                    <Text className="text-zinc-500 text-sm leading-5">
                      {step.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Press Logos */}
            <View className="flex-row justify-center items-center gap-4 mb-4 px-6">
              {pressLogos.map((logo) => (
                <Text key={logo} className="text-zinc-600 text-xs font-bold">
                  {logo}
                </Text>
              ))}
            </View>

            {/* Reviews */}
            <View className="px-6 mb-6">
              <View className="flex-row items-center justify-center gap-4">
                <View className="items-center">
                  <Text className="text-yellow-500 text-sm">★★★★★</Text>
                  <Text className="text-zinc-500 text-xs">15001 Reviews</Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-sm font-semibold">
                    Join 200K+
                  </Text>
                  <Text className="text-zinc-500 text-xs">
                    people using Opal
                  </Text>
                </View>
              </View>
            </View>

            {/* Info text */}
            <View className="px-6 mb-4">
              <Text className="text-zinc-500 text-xs text-center leading-5">
                5 days to spare. Cancel anytime in Settings {">"} {"\n"}
                Apple Account at least a day before each renewal{"\n"}
                date. Plan automatically renews until cancelled.
              </Text>
            </View>

            {/* Restore & Terms */}
            <View className="px-6 mb-4">
              <Pressable onPress={handleRestore} className="mb-3">
                <View className="py-3 px-6 rounded-full border border-zinc-700 self-center">
                  <Text className="text-white text-sm font-medium">
                    Restore Purchases
                  </Text>
                </View>
              </Pressable>
              <Pressable className="mb-2">
                <Text className="text-zinc-500 text-xs text-center">
                  Terms & Privacy
                </Text>
              </Pressable>
              <Pressable onPress={handleSkip}>
                <Text className="text-zinc-500 text-xs text-center">
                  Skip for now
                </Text>
              </Pressable>
            </View>
          </ScrollView>

          {/* Bottom CTA */}
          <View className="px-6 pb-8 pt-8 bg-zinc-800 rounded-t-3xl">
            {/* Pricing */}
            <View className="px-6 mb-6">
              <Text className="text-white text-base font-semibold text-center mb-1">
                Try Free For 1 week
              </Text>
              <Text className="text-zinc-400 text-sm text-center mb-1">
                $99.99/year ($8.33/month)
              </Text>
              <Text className="text-zinc-500 text-xs text-center">
                + share with up to 5 family members
              </Text>
            </View>
            <Pressable
              onPress={handleStartTrial}
              className="w-full py-4 rounded-full bg-blue-500 active:bg-blue-600 mb-3"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Start Your Free Week
              </Text>
            </Pressable>
            <View className="flex-row items-center justify-center">
              <Text className="text-blue-400 mr-2">✓</Text>
              <Text className="text-zinc-400 text-sm">No payment due now!</Text>
            </View>
          </View>

          {/* Restore Success Toast */}
          {showRestoreSuccess && (
            <View className="absolute top-24 left-6 right-6 bg-zinc-800 rounded-xl p-4 border border-zinc-700">
              <Text className="text-white text-center font-semibold">
                You're all set.
              </Text>
              <Text className="text-zinc-400 text-center text-sm">
                Your purchase was restored.
              </Text>
            </View>
          )}
        </SafeAreaView>

        <SuccessModal
          visible={showSuccessModal}
          onFinish={handleSuccessFinished}
        />

        {/* App Store Sheet */}
        <AppStoreSheet
          ref={bottomSheetRef}
          onSubscribe={handleSubscriptionComplete}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
